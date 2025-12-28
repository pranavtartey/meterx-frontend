import { apiService } from "@/services/api-service";
import { ApiResponse } from "@/types/api.types";
import { AuthResponse, NonceResponse } from "./iauth-service";

export const authService = {
    requestNonce: (walletAddress: string) =>
      apiService<NonceResponse, { walletAddress: string }>(
        'post',
        '/auth/request-nonce',
        { walletAddress }
      ),
  
    verifySignature: (walletAddress: string, signature: string) =>
      apiService<AuthResponse, { walletAddress: string; signature: string }>(
        'post',
        '/auth/verify-signature',
        { walletAddress, signature }
      ),
  };