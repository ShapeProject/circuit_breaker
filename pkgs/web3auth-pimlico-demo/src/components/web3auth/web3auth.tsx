"use client"
import { DemoTransactionButton } from "@/components/demo-transaction"
import { Loader } from "@/components/loader"
import { Web3Auth } from "@web3auth/modal"
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector"
import { SmartAccountClient, createSmartAccountClient, walletClientToCustomSigner } from "permissionless"
import { SmartAccount, signerToSimpleSmartAccount } from "permissionless/accounts"
import { createPimlicoPaymasterClient } from "permissionless/clients/pimlico"
import { useCallback, useEffect, useState } from "react"
import { Address, Chain, Hash, Transport, http } from "viem"
import { scrollSepolia } from "viem/chains"
import { useAccount, useConnect, useDisconnect, usePublicClient, useWalletClient } from "wagmi"

if (!process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID)
    throw new Error("Missing NEXT_PUBLIC_WEB3AUTH_CLIENT_ID")

// Create Web3Auth instance
const web3authInstance = new Web3Auth({
    clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID,
    web3AuthNetwork: "mainnet", // Web3Auth Network
    chainConfig: {
        chainNamespace: "eip155",
        chainId: "0x8274F",
        rpcTarget: process.env.NEXT_PUBLIC_RPC_URL!,
        displayName: "Scroll Sepolia",
        blockExplorer: "https://sepolia.scrollscan.com/",
        ticker: "ETH",
        tickerName: "Scroll Sepolia"
    }
})

const pimlicoPaymaster = createPimlicoPaymasterClient({
    transport: http(process.env.NEXT_PUBLIC_PIMLICO_PAYMASTER_RPC_HOST!)
})

const connector = new Web3AuthConnector({
    options: {
        web3AuthInstance: web3authInstance
    }
})

export const Web3AuthFlow = () => {
    const { isConnected } = useAccount()
    const [showLoader, setShowLoader] = useState<boolean>(false)
    const [smartAccountClient, setSmartAccountClient] =
        useState<SmartAccountClient<Transport, Chain, SmartAccount> | null>(
            null
        )
    const publicClient = usePublicClient()
    const { data: walletClient } = useWalletClient()
    const [txHash, setTxHash] = useState<string | null>(null)
    const { disconnect } = useDisconnect()

    const { connect } = useConnect({
        connector: connector
    })

    const signIn = useCallback(async () => {
        setShowLoader(true)
        connect()
    }, [connect])

    const signOut = useCallback(async () => {
        setShowLoader(false)
        disconnect()
    }, [disconnect])


    useEffect(() => {
        ;(async () => {
            if (isConnected && walletClient && publicClient) {
                const customSigner = walletClientToCustomSigner(walletClient);

                const safeSmartAccountClient = await signerToSimpleSmartAccount(
                    publicClient,
                    {
                        entryPoint: process.env.NEXT_PUBLIC_ENTRYPOINT! as Address,
                        signer: customSigner,
                        factoryAddress: "0x9406Cc6185a346906296840746125a0E44976454"
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

    if (isConnected && smartAccountClient) {
        return (
            <div>
                <>{console.log("address:", smartAccountClient.account.address)}</>
                <div>
                    Smart contract wallet address:{" "}
                    <p className="fixed left-0 top-0 flex flex-col w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                        <code>{smartAccountClient.account.address}</code>
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
                            href={`https://sepolia.scrollscan.com/tx/${txHash}`}
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
            {!showLoader && <p className="mr-4">Sign in with Web3Auth</p>}
            {showLoader && <Loader />}
        </button>
    )
}
