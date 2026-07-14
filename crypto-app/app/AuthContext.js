"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Lightweight client-side auth for the demo.
// ── REAL-AUTH HOOK ────────────────────────────────────────────────────
// Replace login()/signup() with calls to your auth backend (e.g. email+
// password, OAuth, or wallet-connect). Store a session token from the
// server (httpOnly cookie) instead of a plain object in localStorage.
// ──────────────────────────────────────────────────────────────────────

const AuthContext = createContext(null);
const KEY = "nexbit_auth_v1";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setUser(JSON.parse(saved));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (user) localStorage.setItem(KEY, JSON.stringify(user));
    else localStorage.removeItem(KEY);
  }, [user, ready]);

  function login(email) {
    const name = email.split("@")[0];
    setUser({ email, name, initial: name.charAt(0).toUpperCase() });
    return { ok: true };
  }

  function signup(email) {
    return login(email);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, ready, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
