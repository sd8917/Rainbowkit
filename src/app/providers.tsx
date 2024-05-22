'use client'; // Important to add this,
import '@rainbow-me/rainbowkit/styles.css';
import  React from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
  darkTheme,
  lightTheme,
  Locale,
  AvatarComponent,
  DisclaimerComponent
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
  oktoWallet,
} from '@rainbow-me/rainbowkit/wallets';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
  sepolia,
} from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: 'YOUR_PROJECT_ID',
  wallets: [
    ...wallets,
    {
      groupName: 'Other Wallet ',
      wallets: [argentWallet, trustWallet, ledgerWallet,oktoWallet],
    },
  ],
  chains: [
    mainnet,
    polygonMumbai,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [
      {
        ...sepolia,
        iconBackground: 'orange',
        iconUrl: 'https://avatars.githubusercontent.com/u/107390249?v=4',
      }
    ] : []),
   
  ]

});

// TODO : Custom avatar...
// const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
//   const color ="red";
//   return ensImage ? (
//     <img
//       src={ensImage}
//       width={size}
//       height={size}
//       style={{ borderRadius: 999 }}
//     />
//   ) : (
//     <div
//       style={{
//         backgroundColor: color,
//         borderRadius: 999,
//         height: size,
//         width: size,
//       }}
//     >
//       :^)
//     </div>
//   );
// };

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the{' '}
    <Link href="https://termsofservice.xyz">Terms of Service</Link> and
    acknowledge you have read and understand the protocol{' '}
    <Link href="https://disclaimer.xyz">Disclaimer</Link>
  </Text>
);

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
              coolMode 
              locale={'en'} 
              appInfo={{
                appName: 'Rainbowkit Demo',
                learnMoreUrl: 'https://learnaboutcryptowallets.example',
                disclaimer: Disclaimer,
              }}
              
          >
                {children}
          </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
