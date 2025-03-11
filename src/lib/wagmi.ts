'use client'

import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { createWeb3Modal } from '@web3modal/wagmi/react'

// Check for project ID
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'demo'

const metadata = {
  name: 'AIDev',
  description: 'AI Development Platform',
  url: 'https://aidev.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmi config
export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http()
  }
})

// Create and export modal
export const web3Modal = createWeb3Modal({
  wagmiConfig: config,
  projectId,
  chains: [mainnet, sepolia],
  themeMode: 'dark',
  metadata
}) 