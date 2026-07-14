"use client";

import Link from "next/link";
import { useWallet } from "../WalletContext";
import { fmtNum } from "../../lib/format";

export default function Header() {
  const { wallet, ready } = useWallet();
  return (
    <header className="header">
      <Link href="/" className="brand">
        <span className="logo-mark">◆</span>NexBit
      </Link>
      <nav className="nav">
        <Link href="/">Markets</Link>
        <Link href="/trade/bitcoin">Trade</Link>
        <Link href="/meme" className="meme">
          🐕 Meme Coins
        </Link>
        <Link href="/assets">Assets</Link>
      </nav>
      <div className="header-right">
        <span className="balance-pill">
          Balance: <b>{ready ? fmtNum(wallet.usdt) : "…"}</b> USDT
        </span>
        <Link href="/assets" className="btn btn-ghost">
          Portfolio
        </Link>
        <Link href="/trade/bitcoin" className="btn btn-gold">
          Trade Now
        </Link>
      </div>
    </header>
  );
}
