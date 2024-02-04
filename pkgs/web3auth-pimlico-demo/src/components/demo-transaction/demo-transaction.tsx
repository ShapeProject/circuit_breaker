import { Loader } from "@/components/loader"
import { ethers } from "ethers"
import { SmartAccountClient } from "permissionless"
import { SmartAccount } from "permissionless/accounts"
import { useState } from "react"
import { Chain, Hash, Transport } from "viem"

/**
 * send UserOp
 * @param param0 
 * @returns 
 */
export const DemoTransactionButton = ({
    smartAccountClient,
    onSendTransaction
}: {
    smartAccountClient: SmartAccountClient<Transport, Chain, SmartAccount>
    onSendTransaction: (txHash: Hash) => void
}) => {
    const [loading, setLoading] = useState<boolean>(false)

    const sendTransaction = async () => {
        setLoading(true)
        const txHash = await smartAccountClient.sendTransaction({
            to: "0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072",
            data: "0x",
            value: ethers.parseEther("0.0001"),
        })
        onSendTransaction(txHash)
        setLoading(false)
    }

    return (
        <div>
            <button
                onClick={sendTransaction}
                className="mt-6 flex justify-center items-center w-64 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                {!loading && <p className="mr-4">Demo transaction</p>}
                {loading && <Loader />}
            </button>
        </div>
    )
}
