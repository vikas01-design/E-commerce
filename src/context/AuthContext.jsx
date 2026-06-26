// ─── AuthContext.jsx — Firebase Auth: Email + Google + Phone ────────────────
import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext(null);

// ── Helper: save / merge user profile to Firestore ──────────────────────────
async function saveUserToFirestore(firebaseUser, extra = {}) {
  try {
    const ref  = doc(db, 'users', firebaseUser.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        uid:      firebaseUser.uid,
        name:     extra.name || firebaseUser.displayName || null,
        email:    firebaseUser.email    || null,
        phone:    firebaseUser.phoneNumber || null,
        photoURL: firebaseUser.photoURL || null,
        createdAt: serverTimestamp(),
        ...extra,
      });
    }
  } catch (err) {
    console.warn('Firestore profile save skipped:', err.message);
  }
}

export function AuthProvider({ children }) {
  const [user,   setUser]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthOpen,  setIsAuthOpen]  = useState(false);
  const [authMode,    setAuthMode]    = useState('signin'); // 'signin' | 'signup'

  // Phone auth state
  const [confirmationResult, setConfirmationResult] = useState(null);
  const recaptchaVerifierRef = useRef(null);

  // ── Restore session on load ─────────────────────────────────────────────
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        let extra = {};
        try {
          const snap = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (snap.exists()) extra = snap.data();
        } catch (_) {}

        setUser({
          uid:      firebaseUser.uid,
          email:    firebaseUser.email,
          phone:    firebaseUser.phoneNumber,
          name:
            extra.name ||
            firebaseUser.displayName ||
            (firebaseUser.email
              ? firebaseUser.email.split('@')[0]
              : firebaseUser.phoneNumber || 'User'),
          photoURL: firebaseUser.photoURL || extra.photoURL || null,
          ...extra,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // ── Modal helpers ────────────────────────────────────────────────────────
  const openSignIn = useCallback(() => { setAuthMode('signin'); setIsAuthOpen(true); }, []);
  const openSignUp = useCallback(() => { setAuthMode('signup'); setIsAuthOpen(true); }, []);

  // ── Email / Password Sign In ─────────────────────────────────────────────
  const signIn = useCallback(async (email, password) => {
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      setIsAuthOpen(false);
      return { success: true, user: credential.user };
    } catch (error) {
      const messages = {
        'auth/user-not-found':     'No account found with this email.',
        'auth/wrong-password':     'Incorrect password. Please try again.',
        'auth/invalid-email':      'Please enter a valid email address.',
        'auth/too-many-requests':  'Too many attempts. Please try again later.',
        'auth/invalid-credential': 'Invalid email or password.',
        'auth/user-disabled':      'This account has been disabled.',
      };
      return { success: false, error: messages[error.code] || `Sign-in failed: ${error.message}` };
    }
  }, []);

  // ── Email / Password Sign Up ─────────────────────────────────────────────
  const signUp = useCallback(async (name, email, password) => {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      const { user: firebaseUser } = credential;
      await updateProfile(firebaseUser, { displayName: name });
      await saveUserToFirestore(firebaseUser, { name });
      setIsAuthOpen(false);
      return { success: true, user: firebaseUser };
    } catch (error) {
      const messages = {
        'auth/email-already-in-use':  'An account with this email already exists.',
        'auth/weak-password':         'Password must be at least 6 characters.',
        'auth/invalid-email':         'Please enter a valid email address.',
        'auth/operation-not-allowed': 'Email/Password sign-up is not enabled.',
        'auth/network-request-failed':'Network error. Check your connection.',
      };
      return { success: false, error: messages[error.code] || `Sign-up failed: ${error.message}` };
    }
  }, []);

  // ── Google OAuth ─────────────────────────────────────────────────────────
  const signInWithGoogle = useCallback(async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      await saveUserToFirestore(result.user);
      setIsAuthOpen(false);
      return { success: true, user: result.user };
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') return { success: false, error: null };
      const messages = {
        'auth/popup-blocked': 'Pop-up was blocked. Please allow pop-ups for this site.',
        'auth/account-exists-with-different-credential':
          'An account exists with this email using a different sign-in method.',
        'auth/unauthorized-domain':
          'Domain not authorized. Add it in Firebase Console → Auth → Settings.',
      };
      return { success: false, error: messages[error.code] || `Google sign-in failed: ${error.message}` };
    }
  }, []);

  // ── Phone Auth — Step 1: Send OTP ────────────────────────────────────────
  const sendOTP = useCallback(async (phoneNumber) => {
    try {
      // Clear any existing verifier to avoid reuse errors
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }

      // Create invisible reCAPTCHA tied to the hidden div in App.jsx
      recaptchaVerifierRef.current = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        { size: 'invisible', callback: () => {} }
      );

      const result = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifierRef.current);
      setConfirmationResult(result);
      return { success: true };
    } catch (error) {
      // Always reset verifier on failure
      try { recaptchaVerifierRef.current?.clear(); } catch (_) {}
      recaptchaVerifierRef.current = null;

      const messages = {
        'auth/invalid-phone-number':   'Invalid phone number. Include country code (e.g. +91 9876543210).',
        'auth/too-many-requests':      'Too many OTP requests. Please wait a few minutes.',
        'auth/quota-exceeded':         'SMS quota exceeded. Try again later.',
        'auth/captcha-check-failed':   'reCAPTCHA failed. Please refresh and try again.',
        'auth/missing-phone-number':   'Please enter a phone number.',
        'auth/network-request-failed': 'Network error. Check your connection.',
      };
      return { success: false, error: messages[error.code] || `Failed to send OTP: ${error.message}` };
    }
  }, []);

  // ── Phone Auth — Step 2: Verify OTP ─────────────────────────────────────
  const verifyOTP = useCallback(async (otp) => {
    try {
      if (!confirmationResult) return { success: false, error: 'Please request an OTP first.' };
      const result = await confirmationResult.confirm(otp);
      await saveUserToFirestore(result.user);
      setConfirmationResult(null);
      setIsAuthOpen(false);
      return { success: true, user: result.user };
    } catch (error) {
      const messages = {
        'auth/invalid-verification-code': 'Incorrect OTP. Please check and try again.',
        'auth/code-expired':              'OTP has expired. Please request a new one.',
        'auth/missing-verification-code': 'Please enter the OTP.',
      };
      return { success: false, error: messages[error.code] || `OTP verification failed: ${error.message}` };
    }
  }, [confirmationResult]);

  // ── Sign Out ─────────────────────────────────────────────────────────────
  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthOpen,
        authMode,
        setAuthMode,
        setIsAuthOpen,
        openSignIn,
        openSignUp,
        signIn,
        signUp,
        signInWithGoogle,
        sendOTP,
        verifyOTP,
        confirmationResult,
        signOut,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
