import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { QueryProvider } from "@/contexts/react-query/query-client-provider";
import { Web3Provider } from "@/contexts/web3/web3-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meter-X",
  description: "Meter-X Decentralized platform for development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>
          <QueryProvider>
            <Toaster position="top-right" richColors closeButton />
            {children}
          </QueryProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
