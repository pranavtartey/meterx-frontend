'use client';

import { wagmiConfig } from '@/config/wagmi.config';
import { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';


export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
        {children}
    </WagmiProvider>
  );
}