import { useEffect } from 'react';
import { useUser } from '@clerk/react';
import { useNavigate } from 'react-router-dom';

const ADMIN_EMAILS = ['vikaselle196@gmail.com', 'yashwantreddy231@gmail.com'];
const ADMIN_PANEL_URL = 'http://localhost:3000/admin/dashboard';

export default function AdminRedirect() {
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn && user) {
      const email = user.primaryEmailAddress?.emailAddress || '';
      if (ADMIN_EMAILS.includes(email)) {
        window.location.href = ADMIN_PANEL_URL;
        return;
      }
    }
    
    // Redirect to home if not authorized
    navigate('/', { replace: true });
  }, [isLoaded, isSignedIn, user, navigate]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
      <div className="flex flex-col items-center gap-3">
        <svg className="animate-spin h-6 w-6 text-violet-500" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <span className="text-xs tracking-wider uppercase font-semibold">Redirecting to Admin Panel...</span>
      </div>
    </div>
  );
}
