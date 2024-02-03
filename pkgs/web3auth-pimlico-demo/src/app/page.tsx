"use client"

import { Home } from "@/components/home"
import { WagmiConfig, createConfig, sepolia } from "wagmi"
import { createPublicClient, http } from "viem"

const config = createConfig({
    autoConnect: true,
    publicClient: createPublicClient({
        chain: sepolia,
        transport: http(process.env.NEXT_PUBLIC_RPC_URL!)
    })
})

export default function Main() {
    return (
        <WagmiConfig config={config}>
            <Home />
        </WagmiConfig>
    )
}
