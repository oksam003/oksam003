import "./globals.css";
import { WalletProvider } from "./WalletContext";
import Header from "./components/Header";
import AIBot from "./components/AIBot";

export const metadata = {
  title: "NexBit — Crypto & Meme Coin Trading",
  description:
    "A Bybit-style crypto exchange demo: spot trading for major coins and meme coins with live prices.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          <Header />
          {children}
          <AIBot />
        </WalletProvider>
      </body>
    </html>
  );
}
