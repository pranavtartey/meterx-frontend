'use client';

import { useWalletAuth } from '@/hooks/components/forms/auth/useWalletAuth';
import { Button } from '@/components/ui/button';

const LoginForm = () => {
  const { 
    address, 
    isConnected, 
    isAuthenticating, 
    connectWallet, 
    connectors,
    requestNonceState,
    verifySignatureState,
  } = useWalletAuth();

  const getStatusMessage = () => {
    if (requestNonceState.isLoading) return 'Requesting nonce...';
    if (verifySignatureState.isLoading) return 'Verifying signature...';
    if (isAuthenticating) return 'Authenticating...';
    return `Connected: ${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome to Meter-X</h1>
        <p className="text-gray-600">Connect your wallet to continue</p>
      </div>

      {!isConnected ? (
        <div className="space-y-3">
          {connectors.map((connector) => (
            <Button
              key={connector.id}
              onClick={() => connectWallet(connector.id)}
              className="w-full"
              variant="outline"
            >
              Connect with {connector.name}
            </Button>
          ))}
        </div>
      ) : (
        <div className="p-4 bg-green-50 rounded-lg text-center">
          <p className="text-sm text-green-800">{getStatusMessage()}</p>
          {isAuthenticating && (
            <div className="mt-2">
              <div className="animate-spin h-5 w-5 border-2 border-green-600 border-t-transparent rounded-full mx-auto" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginForm;