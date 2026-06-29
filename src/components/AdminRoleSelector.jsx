// AdminRoleSelector.jsx — Role selection for admin users after login
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/react';
import { motion, AnimatePresence } from 'framer-motion';

const ADMIN_EMAILS = ['vikaselle196@gmail.com', 'yashwantreddy231@gmail.com'];
const ADMIN_PANEL_URL = 'http://localhost:3000/admin/dashboard';
const SESSION_KEY = 'adminRoleSelectorShown';

export default function AdminRoleSelector() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [visible, setVisible] = useState(false);
  const [choosing, setChoosing] = useState(null); // 'admin' | 'user'

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;

    const email = user.primaryEmailAddress?.emailAddress || '';
    if (!ADMIN_EMAILS.includes(email)) return;

    // Small delay so the page is visible first
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, [isLoaded, isSignedIn, user]);

  const handleAdmin = () => {
    setChoosing('admin');
    setTimeout(() => {
      window.location.href = ADMIN_PANEL_URL;
    }, 500);
  };

  const handleNormalUser = () => {
    setChoosing('user');
    setTimeout(() => setVisible(false), 400);
  };

  const userName = user?.firstName || user?.fullName?.split(' ')[0] || 'Admin';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="admin-selector"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{
            background: 'radial-gradient(ellipse at 30% 40%, rgba(139,92,246,0.15) 0%, rgba(0,0,0,0.92) 60%)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 22, stiffness: 260 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl"
            style={{
              background: 'linear-gradient(145deg, #0f0f14 0%, #16131f 100%)',
              border: '1px solid rgba(139,92,246,0.25)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.7), 0 0 80px rgba(139,92,246,0.08)',
            }}
          >
            {/* Decorative glow orbs */}
            <div style={{
              position: 'absolute', top: '-60px', right: '-60px',
              width: '200px', height: '200px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', bottom: '-40px', left: '-40px',
              width: '160px', height: '160px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Top accent bar */}
            <div style={{
              height: '3px',
              background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #8b5cf6)',
            }} />

            <div className="relative px-8 py-10">
              {/* Admin badge */}
              <div className="flex justify-center mb-6">
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: 'rgba(139,92,246,0.12)',
                  border: '1px solid rgba(139,92,246,0.3)',
                  borderRadius: '100px',
                  padding: '6px 16px',
                }}>
                  <span style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#a78bfa', fontWeight: 700, textTransform: 'uppercase' }}>
                    Admin Account Detected
                  </span>
                </div>
              </div>

              {/* Greeting */}
              <div className="text-center mb-8">
                <h2 style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: '#f8f8ff',
                  marginBottom: '8px',
                  letterSpacing: '-0.01em',
                }}>
                  Welcome, {userName}
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                  How would you like to continue today?
                </p>
              </div>

              {/* Choice Cards */}
              <div className="flex flex-col gap-3">

                {/* Admin Panel Button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAdmin}
                  disabled={!!choosing}
                  style={{
                    width: '100%', padding: '18px 24px',
                    borderRadius: '16px', border: 'none',
                    background: choosing === 'admin'
                      ? 'linear-gradient(135deg, #6d28d9, #9333ea)'
                      : 'linear-gradient(135deg, #7c3aed, #a855f7)',
                    cursor: choosing ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 8px 32px rgba(124,58,237,0.35)',
                    display: 'flex', alignItems: 'center', gap: '16px',
                  }}
                >
                  {/* Admin icon */}
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    background: 'rgba(255,255,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8">
                      <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <div style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', marginBottom: '3px' }}>
                      Continue as Admin
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.78rem' }}>
                      Open the dashboard to manage products, orders &amp; users
                    </div>
                  </div>
                  {choosing === 'admin'
                    ? <svg className="animate-spin" width="18" height="18" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/><path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/></svg>
                    : <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.6)" strokeWidth="2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  }
                </motion.button>

                {/* Normal User Button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNormalUser}
                  disabled={!!choosing}
                  style={{
                    width: '100%', padding: '18px 24px',
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    cursor: choosing ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex', alignItems: 'center', gap: '16px',
                  }}
                  onMouseEnter={e => { if (!choosing) e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                  {/* User icon */}
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    background: 'rgba(255,255,255,0.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <div style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '3px' }}>
                      Continue as Normal User
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>
                      Browse the store as a regular customer
                    </div>
                  </div>
                  {choosing === 'user'
                    ? <svg className="animate-spin" width="18" height="18" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.6)" strokeWidth="4"/><path className="opacity-75" fill="rgba(255,255,255,0.6)" d="M4 12a8 8 0 018-8v8z"/></svg>
                    : <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.3)" strokeWidth="2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  }
                </motion.button>
              </div>

              {/* Footer note */}
              <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.73rem', color: 'rgba(255,255,255,0.25)', lineHeight: 1.5 }}>
                You can always access the admin panel at localhost:3000/admin
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
