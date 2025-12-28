export interface NonceResponse {
  nonce: string;
  message: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    walletAddress: string;
    role: string;
  };
}
