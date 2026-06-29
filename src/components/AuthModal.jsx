// ─── AuthModal.jsx — Clerk handles auth UI natively ─────────────────────────
// The custom Firebase email/phone modal is removed. Clerk opens its own hosted
// modal when SignInButton / openSignIn() is called. This file is kept as a
// no-op shell so existing imports in App.jsx don't break.
export default function AuthModal() {
  return null; // Clerk modal is rendered by ClerkProvider — no custom UI needed
}
