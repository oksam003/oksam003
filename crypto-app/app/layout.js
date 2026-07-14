import "./globals.css";
import { AuthProvider } from "./AuthContext";
import { WalletProvider } from "./WalletContext";
import Header from "./components/Header";
import AIBot from "./components/AIBot";

export const metadata = {
  title: "Nexa — Crypto & Meme Coin Trading",
  description:
    "A Bybit-style crypto exchange: spot trading for major coins and meme coins with live prices.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <WalletProvider>
            <Header />
            {children}
            <AIBot />
          </WalletProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
