import { ScrollSepoliaTestnet } from "@thirdweb-dev/chains";
import { ThirdwebSDK, isContractDeployed } from "@thirdweb-dev/sdk";
import { LocalWallet, SmartWallet } from "@thirdweb-dev/wallets";
import {
    ACCOUNT_FACTORY_ADDRESS,
    MONSTER_CONTRACT_ADDRESS,
    TOKEN_CONTRACT_ADDRESS
} from "../const/addresses";

const chain = ScrollSepoliaTestnet;

/**
 * createSmartWallet method
 * @returns 
 */
export function createSmartWallet(): SmartWallet {
    const smartWallet = new SmartWallet({
        chain: "ScrollSepoliaTestnet",
        factoryAddress: ACCOUNT_FACTORY_ADDRESS,
        gasless: true,
        clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID,
    });
    return smartWallet;
};

/**
 * connectSmartWallet method
 * @param password 
 * @param statusCallback 
 * @returns 
 */
export async function connectSmartWallet(
    password: string,
    statusCallback: (status: string) => void
): Promise<SmartWallet> {
    statusCallback("Searching for trainer account...");
    const smartWallet = createSmartWallet();
    const personalWallet = new LocalWallet();
    await personalWallet.loadOrCreate({
        strategy: "encryptedJson",
        password: password,
    });
    await smartWallet.connect({
        personalWallet
    });

    const sdk = await ThirdwebSDK.fromWallet(
        smartWallet,
        chain,
        {
            clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID,
        }
    );

    const address = await sdk.wallet.getAddress();
    const isDeployed = await isContractDeployed(
        address,
        sdk.getProvider(),
    );

    if (!isDeployed) {
        statusCallback("New account detected...");
        const monsterContract = await sdk.getContract(MONSTER_CONTRACT_ADDRESS);
        const tokenContract = await sdk.getContract(TOKEN_CONTRACT_ADDRESS);

        statusCallback("Creating new account...");
        const tx1 = await monsterContract.erc1155.claim.prepare(0, 1);
        const tx2 = await tokenContract.erc20.claim.prepare(10);
        const transactions = [tx1, tx2];

        statusCallback("Sending starter monster and initial funds...");
        const batchTx = await smartWallet.executeBatch(transactions);
    } else {
        statusCallback("Trainer account found! Loading monsters...");
    }
    return smartWallet;
};