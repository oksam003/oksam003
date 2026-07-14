"use client";

import Link from "next/link";
import { useWallet } from "../WalletContext";
import { useAuth } from "../AuthContext";
import { fmtNum } from "../../lib/format";

export default function Header() {
  const { wallet, ready } = useWallet();
  const { user, logout } = useAuth();
  return (
    <header className="header">
      <Link href="/" className="brand">
        <span className="logo-mark">◆</span>Nexa
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
        {user ? (
          <>
            <Link href="/assets" className="user-chip" title={user.email}>
              <span className="user-av">{user.initial}</span>
              {user.name}
            </Link>
            <button className="btn btn-ghost" onClick={logout}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="btn btn-ghost">
              Log In
            </Link>
            <Link href="/login" className="btn btn-gold">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
