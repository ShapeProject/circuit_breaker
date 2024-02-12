import { RainbowKitProvider, darkTheme, getDefaultWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import {
  scrollSepolia
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import '../styles/globals.css';

const { 
  chains, 
  publicClient, 
  webSocketPublicClient 
} = configureChains(
  [
    scrollSepolia,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [scrollSepolia] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'TrustedScore',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  chains,
});

const wagmiConfig = createConfig({
  // autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider 
        chains={chains} 
        coolMode={true} 
        locale='en' 
        showRecentTransactions={true}
        theme={darkTheme({
          accentColor: '#7b3fe4',
          accentColorForeground: 'white',
          borderRadius: 'small',
          fontStack: 'system',
          overlayBlur: 'small',
        })}
        appInfo={{
          appName: 'TrustedScore',
          learnMoreUrl: 'https://github.com/ShapeProject/circuit_breaker',
        }}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
