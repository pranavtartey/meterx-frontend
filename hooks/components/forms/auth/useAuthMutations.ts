import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth/login/auth-service';
import { toast } from 'sonner';

export const useRequestNonce = () => {
  return useMutation({
    mutationFn: (walletAddress: string) => authService.requestNonce(walletAddress),
    onError: (error: any) => {
      console.error('Request nonce error:', error);
      // Toast already shown by apiService
    },
  });
};

export const useVerifySignature = () => {
  return useMutation({
    mutationFn: ({ walletAddress, signature }: { walletAddress: string; signature: string }) =>
      authService.verifySignature(walletAddress, signature),
    onSuccess: (data) => {
      toast.success('Authentication successful!');
    },
    onError: (error: any) => {
      console.error('Verify signature error:', error);
      // Toast already shown by apiService
    },
  });
};