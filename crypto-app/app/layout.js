import "./globals.css";
import { WalletProvider } from "./WalletContext";
import Header from "./components/Header";

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
          <div className="disclaimer">
            ⚠️ Demo application for portfolio purposes. Trades are simulated with
            a virtual balance — no real funds are involved. Live prices via
            CoinGecko.
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}
