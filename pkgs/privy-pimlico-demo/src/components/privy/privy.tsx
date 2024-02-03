"use client"
import { DemoTransactionButton } from "@/components/demo-transaction"
import { Loader } from "@/components/loader"
import { PrivyProvider, usePrivy, useWallets } from "@privy-io/react-auth"
import { PrivyWagmiConnector, usePrivyWagmi } from "@privy-io/wagmi-connector"
import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc"
import {
    SmartAccountClient,
    createSmartAccountClient,
    walletClientToCustomSigner
} from "permissionless"
import {
    SmartAccount,
    signerToSimpleSmartAccount
} from "permissionless/accounts"
import { createPimlicoPaymasterClient } from "permissionless/clients/pimlico"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Address, Chain, Hash, Transport, http } from "viem"
import { scrollSepolia } from "viem/chains"
import { WagmiConfig, configureChains, createConfig, useAccount, useDisconnect, usePublicClient, useWalletClient } from "wagmi"

const configureChainsConfig = configureChains(
    [scrollSepolia],
    [
        jsonRpcProvider({
            rpc: () => ({
                http: process.env.NEXT_PUBLIC_RPC_URL!
            })
        })
    ]
)

const config = createConfig({
    autoConnect: true,
    publicClient: configureChainsConfig.publicClient
})

if (!process.env.NEXT_PUBLIC_PRIVY_APP_ID)
    throw new Error("Missing NEXT_PUBLIC_PRIVY_APP_ID")

const pimlicoPaymaster = createPimlicoPaymasterClient({
    transport: http(process.env.NEXT_PUBLIC_PIMLICO_PAYMASTER_RPC_HOST!)
})

export const PrivyFLowProvider = ({
    children
}: { children: React.ReactNode }) => {
    return (
        <WagmiConfig config={config}>
            <PrivyProvider
                appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
                config={{
                    embeddedWallets: {
                        createOnLogin: "all-users"
                    },
                    loginMethods: ["email", "wallet", "discord", "github", "github", "twitter", "sms"],
                    appearance: {
                        theme: "light",
                        accentColor: "#676FFF",
                        logo: "https://avatars.githubusercontent.com/u/125581500?s=200&v=4"
                    }
                }}
            >
                <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
                    {children}
                </PrivyWagmiConnector>
            </PrivyProvider>
        </WagmiConfig>
    )
}

export const PrivyFlow = () => {
    const { login } = usePrivy()
    const { isConnected } = useAccount()
    const [showLoader, setShowLoader] = useState<boolean>(false)
    const [smartAccountClient, setSmartAccountClient] =
        useState<SmartAccountClient<Transport, Chain, SmartAccount> | null>(
            null
        )
    const publicClient = usePublicClient()
    const { wallets } = useWallets()
    const { data: walletClient } = useWalletClient()
    const [txHash, setTxHash] = useState<string | null>(null)
    const { disconnect } = useDisconnect()

    const { setActiveWallet } = usePrivyWagmi()

    const embeddedWallet = useMemo(
        () => wallets.find((wallet) => wallet.walletClientType === "privy"),
        [wallets]
    )

    useEffect(() => setActiveWallet(embeddedWallet), [embeddedWallet])

    const signIn = useCallback(async () => {
        setShowLoader(true)
        login()
    }, [login])

    const signOut = useCallback(async () => {
        setShowLoader(false)
        disconnect()
    }, [disconnect])

    useEffect(() => {
        ;(async () => {
            if (isConnected && walletClient && publicClient) {
                const customSigner = walletClientToCustomSigner(walletClient)

                const safeSmartAccountClient = await signerToSimpleSmartAccount(
                    publicClient,
                    {
                        entryPoint: process.env
                            .NEXT_PUBLIC_ENTRYPOINT! as Address,
                        signer: customSigner,
                        factoryAddress: process.env
                            .NEXT_PUBLIC_FACTORY_ADDRESS! as Address
                    }
                )

                const smartAccountClient = createSmartAccountClient({
                    account: safeSmartAccountClient,
                    chain: scrollSepolia,
                    transport: http(process.env.NEXT_PUBLIC_BUNDLER_RPC_HOST!),
                    sponsorUserOperation: pimlicoPaymaster.sponsorUserOperation
                })

                setSmartAccountClient(smartAccountClient)
            }
        })()
    }, [isConnected, walletClient, publicClient])

    const onSendTransaction = (txHash: Hash) => {
        setTxHash(txHash)
    }

    if (isConnected && smartAccountClient && embeddedWallet) {
        return (
            <div>
                <div>
                    Smart contract wallet address:{" "}
                    <p className="fixed left-0 top-0 flex flex-col w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                        <code>{smartAccountClient.account?.address}</code>
                    </p>
                </div>
                <div className="flex gap-x-4">
                    <button
                        onClick={signOut}
                        className="mt-6 flex justify-center items-center w-64 cursor-pointer border-2 border-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Sign out
                    </button>
                    <DemoTransactionButton
                        smartAccountClient={smartAccountClient}
                        onSendTransaction={onSendTransaction}
                    />
                </div>
                {txHash && (
                    <p className="mt-4">
                        Transaction hash:{" "}
                        <a
                            href={`https://sepolia.etherscan.io/tx/${txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                        >
                            {txHash}
                        </a>
                    </p>
                )}
            </div>
        )
    }

    return (
        <button
            onClick={signIn}
            className="flex justify-center items-center w-64 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            {!showLoader && <p className="mr-4">Sign in with Privy</p>}
            {showLoader && <Loader />}
        </button>
    )
}
