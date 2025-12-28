'use client';

import { useEffect } from 'react';
import { useAccount, useSignMessage, useConnect, useDisconnect } from 'wagmi';
import { toast } from 'sonner';
import { setAuthToken, clearAuthToken } from '@/store/local-storage';
import { useRouter } from 'next/navigation';
import { useRequestNonce, useVerifySignature } from './useAuthMutations';

export const useWalletAuth = () => {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  // React Query mutations
  const requestNonceMutation = useRequestNonce();
  const verifySignatureMutation = useVerifySignature();

  const authenticate = async () => {
    if (!address) return;

    try {
      // Step 1: Request nonce
      const { message } = await requestNonceMutation.mutateAsync(address);

      // Step 2: Sign message
      const signature = await signMessageAsync({ message });

      // Step 3: Verify signature
      const { accessToken } = await verifySignatureMutation.mutateAsync({
        walletAddress: address,
        signature,
      });

      // Step 4: Store token and redirect
      setAuthToken(accessToken);
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Authentication error:', error);
      // Errors already handled by mutations
    }
  };

  const logout = () => {
    clearAuthToken();
    disconnect();
    router.push('/login');
    toast.success('Logged out successfully');
  };

  // Auto-authenticate when wallet connects
  useEffect(() => {
    if (isConnected && address && !isAuthenticating) {
      authenticate();
    }
  }, [isConnected, address]);

  const isAuthenticating = 
    requestNonceMutation.isPending || 
    verifySignatureMutation.isPending;

  return {
    address,
    isConnected,
    isAuthenticating,
    authenticate,
    connectWallet: (id: string) => {
      const connector = connectors.find((c) => c.id === id);
      if (connector) connect({ connector });
    },
    logout,
    connectors,
    // Expose mutation states for granular control
    requestNonceState: {
      isLoading: requestNonceMutation.isPending,
      error: requestNonceMutation.error,
    },
    verifySignatureState: {
      isLoading: verifySignatureMutation.isPending,
      error: verifySignatureMutation.error,
    },
  };
};