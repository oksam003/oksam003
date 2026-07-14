"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, signup } = useAuth();
  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  function submit(e) {
    e.preventDefault();
    setErr("");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setErr("Enter a valid email address.");
      return;
    }
    if (pw.length < 6) {
      setErr("Password must be at least 6 characters.");
      return;
    }
    const res = mode === "login" ? login(email) : signup(email);
    if (res.ok) router.push("/");
    else setErr(res.error || "Something went wrong.");
  }

  return (
    <main className="auth-wrap">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="logo-mark">◆</span> Nexa
        </div>
        <h1 className="auth-title">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="auth-sub">
          {mode === "login"
            ? "Log in to trade crypto and meme coins."
            : "Sign up to start trading in seconds."}
        </p>

        <form onSubmit={submit}>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
          </div>

          {err && <div className="toast err">{err}</div>}

          <button type="submit" className="auth-submit">
            {mode === "login" ? "Log In" : "Sign Up"}
          </button>
        </form>

        <div className="auth-divider">
          <span>or continue with</span>
        </div>
        <div className="auth-social">
          <button type="button" onClick={() => login("google.user@gmail.com")}>
            🇬 Google
          </button>
          <button type="button" onClick={() => login("wallet.user@web3.io")}>
            👛 Wallet
          </button>
        </div>

        <div className="auth-switch">
          {mode === "login" ? (
            <>
              New to Nexa?{" "}
              <button onClick={() => setMode("signup")}>Create an account</button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => setMode("login")}>Log in</button>
            </>
          )}
        </div>

        <Link href="/" className="auth-back">
          ← Back to markets
        </Link>
      </div>
    </main>
  );
}
