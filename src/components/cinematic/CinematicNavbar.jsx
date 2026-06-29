import { Search, ShoppingBag, User, LogOut, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useUser, useClerk } from '@clerk/react';

const CinematicNavbar = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const { isSignedIn, user: clerkUser } = useUser();
  const { openSignIn, signOut } = useClerk();
  const user = isSignedIn && clerkUser ? {
    name: clerkUser.fullName || clerkUser.primaryEmailAddress?.emailAddress?.split('@')[0] || 'User',
    photoURL: clerkUser.imageUrl || null,
  } : null;
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  /* Solidify navbar once user scrolls past 60px */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  return (
    <nav
      className="cin-nav"
      aria-label="Main navigation"
      style={{
        /* Always fixed at the very top */
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        padding: '22px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        /* Transition from transparent → dark on scroll */
        background: scrolled
          ? 'rgba(10,10,10,0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(122,17,17,0.25)'
          : '1px solid transparent',
        transition: 'background 0.4s ease, border-color 0.4s ease, backdropFilter 0.4s ease, padding 0.3s ease',
        /* Remove the blend-mode that was hiding the navbar */
        mixBlendMode: 'normal',
      }}
    >
      {/* ── Brand ── */}
      <Link
        to="/"
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: scrolled ? '1.3rem' : '1.6rem',
          fontWeight: 700,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--cin-pearl)',
          textDecoration: 'none',
          transition: 'font-size 0.3s ease',
          flexShrink: 0,
        }}
      >
        Sai Deepthi
      </Link>

      {/* ── Nav links (desktop) ── */}
      

      {/* ── Actions ── */}
      <div className="cin-nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>

        {/* Search */}
        {isSearchOpen ? (
          <form
            onSubmit={handleSearchSubmit}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <div style={{ position: 'relative' }}>
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search collections…"
                style={{
                  background: 'rgba(253,251,247,0.08)',
                  border: '1px solid rgba(253,251,247,0.2)',
                  borderRadius: '20px',
                  padding: '7px 36px 7px 14px',
                  color: 'var(--cin-pearl)',
                  fontSize: '0.78rem',
                  outline: 'none',
                  width: '180px',
                  fontFamily: "'Montserrat', sans-serif",
                  letterSpacing: '0.05em',
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute', right: '10px', top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'rgba(253,251,247,0.5)', display: 'flex', padding: 0,
                  }}
                >
                  <X size={13} />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(253,251,247,0.5)', display: 'flex' }}
              aria-label="Close search"
            >
              <X size={16} />
            </button>
          </form>
        ) : (
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--cin-pearl)', display: 'flex', alignItems: 'center',
              opacity: 0.8, transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}
          >
            <Search size={19} strokeWidth={1.5} />
          </button>
        )}

        {/* Auth */}
        {user ? (
          <button
            onClick={signOut}
            aria-label="Sign out"
            title={`Signed in as ${user.name} — click to sign out`}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--cin-pearl)', display: 'flex', alignItems: 'center',
              opacity: 0.8, transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}
          >
            <LogOut size={18} strokeWidth={1.5} />
          </button>
        ) : (
          <button
            onClick={openSignIn}
            aria-label="Sign in"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--cin-pearl)', display: 'flex', alignItems: 'center',
              opacity: 0.8, transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}
          >
            <User size={18} strokeWidth={1.5} />
          </button>
        )}

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          aria-label="Open cart"
          style={{
            position: 'relative', background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--cin-pearl)', display: 'flex', alignItems: 'center',
            opacity: 0.8, transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '1'}
          onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}
        >
          <ShoppingBag size={20} strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="cin-cart-badge">{cartCount}</span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default CinematicNavbar;
