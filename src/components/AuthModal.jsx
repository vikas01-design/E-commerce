import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// ── Country code list ────────────────────────────────────────────────────────
const COUNTRY_CODES = [
  { code: '+91',  flag: '🇮🇳', name: 'India' },
  { code: '+1',   flag: '🇺🇸', name: 'USA' },
  { code: '+44',  flag: '🇬🇧', name: 'UK' },
  { code: '+61',  flag: '🇦🇺', name: 'Australia' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+65',  flag: '🇸🇬', name: 'Singapore' },
  { code: '+60',  flag: '🇲🇾', name: 'Malaysia' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+49',  flag: '🇩🇪', name: 'Germany' },
  { code: '+33',  flag: '🇫🇷', name: 'France' },
];

export default function AuthModal() {
  const {
    isAuthOpen, authMode, setAuthMode, setIsAuthOpen,
    signIn, signUp, signInWithGoogle, sendOTP, verifyOTP,
  } = useAuth();

  // ── Email / Password state ────────────────────────────────────────────────
  const [formData,     setFormData]     = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error,        setError]        = useState('');
  const [loading,      setLoading]      = useState(false);
  const [touched,      setTouched]      = useState({ name: false, email: false, password: false });

  // ── Google state ─────────────────────────────────────────────────────────
  const [googleLoading, setGoogleLoading] = useState(false);

  // ── Phone auth state ──────────────────────────────────────────────────────
  const [phoneView,    setPhoneView]    = useState(false);      // show phone screen
  const [phoneStep,    setPhoneStep]    = useState('number');   // 'number' | 'otp'
  const [countryCode,  setCountryCode]  = useState('+91');
  const [phoneNumber,  setPhoneNumber]  = useState('');
  const [otpDigits,    setOtpDigits]    = useState(['', '', '', '', '', '']);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [resendTimer,  setResendTimer]  = useState(0);
  const otpRefs = useRef([]);

  // ── Resend countdown timer ────────────────────────────────────────────────
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer(r => r - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  // ── Reset everything when modal closes ───────────────────────────────────
  useEffect(() => {
    if (!isAuthOpen) {
      setFormData({ name: '', email: '', password: '' });
      setError('');
      setShowPassword(false);
      setTouched({ name: false, email: false, password: false });
      setPhoneView(false);
      setPhoneStep('number');
      setPhoneNumber('');
      setOtpDigits(['', '', '', '', '', '']);
      setResendTimer(0);
    }
  }, [isAuthOpen]);

  // ── Email form validation ─────────────────────────────────────────────────
  const validateForm = useCallback(() => {
    const errors = {};
    if (authMode === 'signup' && !formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim())                          errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email';
    if (!formData.password)                              errors.password = 'Password is required';
    else if (formData.password.length < 6)               errors.password = 'Min 6 characters';
    return errors;
  }, [formData, authMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleBlur = (field) => setTouched(prev => ({ ...prev, [field]: true }));

  // ── Email submit ──────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) { setError(Object.values(errors)[0]); return; }
    setLoading(true);
    setError('');
    try {
      const result = authMode === 'signin'
        ? await signIn(formData.email, formData.password)
        : await signUp(formData.name, formData.email, formData.password);
      if (!result.success) setError(result.error);
      else setFormData({ name: '', email: '', password: '' });
    } catch { setError('An unexpected error occurred.'); }
    finally   { setLoading(false); }
  };

  // ── Google submit ─────────────────────────────────────────────────────────
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError('');
    try {
      const result = await signInWithGoogle();
      if (result && !result.success && result.error) setError(result.error);
    } catch { setError('Google sign-in failed. Please try again.'); }
    finally { setGoogleLoading(false); }
  };

  // ── Phone: Send OTP ───────────────────────────────────────────────────────
  const handleSendOTP = async () => {
    const digits = phoneNumber.replace(/\D/g, '');
    if (digits.length < 7) { setError('Please enter a valid phone number.'); return; }
    setPhoneLoading(true);
    setError('');
    try {
      const full   = `${countryCode}${digits}`;
      const result = await sendOTP(full);
      if (result.success) {
        setPhoneStep('otp');
        setResendTimer(30);
        setTimeout(() => otpRefs.current[0]?.focus(), 100);
      } else {
        setError(result.error || 'Failed to send OTP.');
      }
    } catch { setError('Failed to send OTP. Please try again.'); }
    finally { setPhoneLoading(false); }
  };

  // ── Phone: OTP digit input ────────────────────────────────────────────────
  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otpDigits];
    next[index] = value;
    setOtpDigits(next);
    setError('');
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft'  && index > 0) otpRefs.current[index - 1]?.focus();
    if (e.key === 'ArrowRight' && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const next = [...otpDigits];
    pasted.split('').forEach((d, i) => { next[i] = d; });
    setOtpDigits(next);
    otpRefs.current[Math.min(pasted.length, 5)]?.focus();
    e.preventDefault();
  };

  // ── Phone: Verify OTP ─────────────────────────────────────────────────────
  const handleVerifyOTP = async () => {
    const otp = otpDigits.join('');
    if (otp.length < 6) { setError('Please enter all 6 digits.'); return; }
    setPhoneLoading(true);
    setError('');
    try {
      const result = await verifyOTP(otp);
      if (!result.success) setError(result.error || 'Verification failed.');
    } catch { setError('OTP verification failed. Please try again.'); }
    finally { setPhoneLoading(false); }
  };

  // ── Phone: Resend ─────────────────────────────────────────────────────────
  const handleResend = async () => {
    setOtpDigits(['', '', '', '', '', '']);
    setError('');
    await handleSendOTP();
  };

  const switchMode = useCallback(() => {
    setAuthMode(prev => prev === 'signin' ? 'signup' : 'signin');
    setError('');
    setFormData({ name: '', email: '', password: '' });
    setTouched({ name: false, email: false, password: false });
  }, [setAuthMode]);

  if (!isAuthOpen) return null;

  // ════════════════════════════════════════════════════════════════════════════
  //  PHONE AUTH VIEW
  // ════════════════════════════════════════════════════════════════════════════
  if (phoneView) {
    return (
      <>
        <div className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm" onClick={() => setIsAuthOpen(false)} aria-hidden="true" />
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Phone sign in">
          <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>

            {/* Top gradient bar */}
            <div className="h-1.5 bg-gradient-to-r from-[#EFD3D7] via-[#CBC0D3] to-[#8E9AAF]" />

            <div className="px-8 py-8">
              {/* Close */}
              <button onClick={() => setIsAuthOpen(false)} className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#CBC0D3]" aria-label="Close">
                <X size={18} className="text-gray-500" />
              </button>

              {/* Back + Title */}
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => { setPhoneView(false); setPhoneStep('number'); setOtpDigits(['','','','','','']); setError(''); }}
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#CBC0D3]"
                  aria-label="Back"
                >
                  <ArrowLeft size={18} className="text-gray-600" />
                </button>
                <div>
                  <h2 className="font-semibold text-gray-900 text-lg">
                    {phoneStep === 'number' ? 'Enter your phone number' : 'Enter the OTP'}
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {phoneStep === 'number'
                      ? 'We\'ll send a one-time verification code'
                      : `Sent to ${countryCode} ${phoneNumber}`}
                  </p>
                </div>
              </div>

              {/* ── STEP 1: Phone number ──────────────────────────── */}
              {phoneStep === 'number' && (
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    {/* Country code selector */}
                    <div className="relative">
                      <select
                        value={countryCode}
                        onChange={e => setCountryCode(e.target.value)}
                        className="h-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3 pl-3 pr-7 text-sm text-gray-900 outline-none focus:border-[#CBC0D3] focus:ring-2 focus:ring-[#EFD3D7] transition-colors cursor-pointer"
                        aria-label="Country code"
                        id="phone-country-code"
                      >
                        {COUNTRY_CODES.map(c => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
                    </div>

                    {/* Phone number input */}
                    <div className="relative flex-1">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        id="phone-number-input"
                        type="tel"
                        placeholder="Phone number"
                        value={phoneNumber}
                        onChange={e => { setPhoneNumber(e.target.value); setError(''); }}
                        onKeyDown={e => e.key === 'Enter' && handleSendOTP()}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#CBC0D3] focus:ring-2 focus:ring-[#EFD3D7] transition-colors"
                        autoFocus
                        aria-label="Phone number"
                        inputMode="tel"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600 text-center" role="alert">{error}</p>
                  )}

                  <button
                    id="send-otp-btn"
                    onClick={handleSendOTP}
                    disabled={phoneLoading || !phoneNumber.trim()}
                    className="w-full rounded-xl bg-gray-900 py-3.5 text-sm font-semibold text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-[#CBC0D3] focus:ring-offset-2"
                  >
                    {phoneLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                        Sending OTP…
                      </span>
                    ) : 'Send OTP'}
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    Standard SMS rates may apply
                  </p>
                </div>
              )}

              {/* ── STEP 2: OTP verification ──────────────────────── */}
              {phoneStep === 'otp' && (
                <div className="flex flex-col gap-5">
                  {/* 6-digit OTP boxes */}
                  <div className="flex justify-center gap-2" onPaste={handleOtpPaste}>
                    {otpDigits.map((digit, i) => (
                      <input
                        key={i}
                        ref={el => (otpRefs.current[i] = el)}
                        id={`otp-digit-${i}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={e => handleOtpChange(i, e.target.value)}
                        onKeyDown={e => handleOtpKeyDown(i, e)}
                        className="w-11 h-13 rounded-xl border-2 border-gray-200 bg-gray-50 text-center text-xl font-bold text-gray-900 outline-none focus:border-[#CBC0D3] focus:ring-2 focus:ring-[#EFD3D7] transition-all"
                        style={{ height: '52px' }}
                        aria-label={`OTP digit ${i + 1}`}
                      />
                    ))}
                  </div>

                  {error && (
                    <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600 text-center" role="alert">{error}</p>
                  )}

                  <button
                    id="verify-otp-btn"
                    onClick={handleVerifyOTP}
                    disabled={phoneLoading || otpDigits.join('').length < 6}
                    className="w-full rounded-xl bg-gray-900 py-3.5 text-sm font-semibold text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-[#CBC0D3] focus:ring-offset-2"
                  >
                    {phoneLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                        Verifying…
                      </span>
                    ) : 'Verify OTP'}
                  </button>

                  {/* Resend */}
                  <div className="text-center">
                    {resendTimer > 0 ? (
                      <p className="text-sm text-gray-400">
                        Resend OTP in <span className="font-semibold text-gray-600">{resendTimer}s</span>
                      </p>
                    ) : (
                      <button
                        onClick={handleResend}
                        disabled={phoneLoading}
                        className="flex items-center gap-1.5 text-sm text-[#8E9AAF] hover:underline mx-auto focus:outline-none disabled:opacity-50"
                      >
                        <RefreshCw size={13} />
                        Resend OTP
                      </button>
                    )}
                  </div>

                  {/* Change number */}
                  <button
                    onClick={() => { setPhoneStep('number'); setOtpDigits(['','','','','','']); setError(''); }}
                    className="text-center text-xs text-gray-400 hover:underline focus:outline-none"
                  >
                    Change phone number
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  //  MAIN AUTH VIEW (Email + Google + Phone button)
  // ════════════════════════════════════════════════════════════════════════════
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm" onClick={() => setIsAuthOpen(false)} aria-hidden="true" />

      {/* Modal */}
      <div className="fixed inset-0 z-[400] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
        <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>

          {/* Decorative top bar */}
          <div className="h-1.5 bg-gradient-to-r from-[#EFD3D7] via-[#CBC0D3] to-[#8E9AAF]" />

          <div className="px-8 py-8">
            {/* Close */}
            <button onClick={() => setIsAuthOpen(false)} className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#CBC0D3]" aria-label="Close modal">
              <X size={18} className="text-gray-500" />
            </button>

            {/* Brand header */}
            <div className="text-center mb-8">
              <h1 id="auth-modal-title" className="font-serif text-3xl font-semibold text-gray-900 italic">Sai Deepthi</h1>
              <p className="mt-2 text-sm text-gray-500">
                {authMode === 'signin' ? 'Welcome back, beautiful.' : 'Join our fashion family today.'}
              </p>
            </div>

            {/* Toggle tabs */}
            <div className="flex rounded-full bg-gray-100 p-1 mb-7" role="tablist">
              <button
                onClick={() => { setAuthMode('signin'); setError(''); }}
                className={`flex-1 rounded-full py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#CBC0D3] ${authMode === 'signin' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                role="tab" aria-selected={authMode === 'signin'}
              >Sign In</button>
              <button
                onClick={() => { setAuthMode('signup'); setError(''); }}
                className={`flex-1 rounded-full py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#CBC0D3] ${authMode === 'signup' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                role="tab" aria-selected={authMode === 'signup'}
              >Create Account</button>
            </div>

            {/* Email / Password form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" id="auth-form">
              {authMode === 'signup' && (
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text" name="name" placeholder="Full Name"
                    value={formData.name} onChange={handleChange} onBlur={() => handleBlur('name')}
                    required aria-label="Full Name"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#CBC0D3] focus:ring-2 focus:ring-[#EFD3D7] transition-colors"
                  />
                </div>
              )}

              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email" name="email" placeholder="Email Address"
                  value={formData.email} onChange={handleChange} onBlur={() => handleBlur('email')}
                  required aria-label="Email Address"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#CBC0D3] focus:ring-2 focus:ring-[#EFD3D7] transition-colors"
                />
              </div>

              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'} name="password" placeholder="Password"
                  value={formData.password} onChange={handleChange} onBlur={() => handleBlur('password')}
                  required minLength={6} aria-label="Password"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-11 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#CBC0D3] focus:ring-2 focus:ring-[#EFD3D7] transition-colors"
                />
                <button
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {authMode === 'signin' && (
                <div className="flex justify-end">
                  <button type="button" className="text-xs text-[#8E9AAF] hover:underline focus:outline-none">
                    Forgot password?
                  </button>
                </div>
              )}

              {error && (
                <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600 text-center" role="alert">{error}</p>
              )}

              <button
                type="submit" disabled={loading}
                className="mt-2 w-full rounded-xl bg-gray-900 py-3.5 text-sm font-semibold text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-[#CBC0D3] focus:ring-offset-2"
              >
                {loading ? 'Please wait…' : authMode === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6">
              <div className="relative flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400 font-medium">OR CONTINUE WITH</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Google + Phone buttons */}
              <div className="flex flex-col gap-3">
                {/* Google */}
                <button
                  id="google-signin-btn"
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={googleLoading || loading}
                  className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#CBC0D3] shadow-sm hover:shadow-md"
                  aria-label="Continue with Google"
                >
                  {googleLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                      <span>Connecting to Google…</span>
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <span>Continue with Google</span>
                    </>
                  )}
                </button>

                {/* Phone */}
                <button
                  id="phone-signin-btn"
                  type="button"
                  onClick={() => { setPhoneView(true); setPhoneStep('number'); setError(''); }}
                  disabled={loading || googleLoading}
                  className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#CBC0D3] shadow-sm hover:shadow-md"
                  aria-label="Continue with Phone"
                >
                  <Phone size={18} className="text-gray-600" />
                  <span>Continue with Phone</span>
                </button>
              </div>
            </div>

            {/* Switch mode */}
            <p className="mt-6 text-center text-sm text-gray-500">
              {authMode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button onClick={switchMode} className="font-semibold text-[#8E9AAF] hover:underline focus:outline-none rounded">
                {authMode === 'signin' ? 'Create one' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
