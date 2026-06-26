import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount, setIsCartOpen } = useCart();
  const { isSignedIn } = useAuth();

  // Shrink + solidify navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/shop' },
  ];

  return (
    <>
      {/* ── Fixed navbar wrapper ── */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        padding: '12px 16px',
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(10px)',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.1)' : '0 1px 10px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
        pointerEvents: 'auto',
      }}>
        <nav style={{
          background: '#ffffff',
          borderRadius: '50px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 24px',
          width: '100%',
          maxWidth: '1200px',
          gap: '12px',
        }}>

          {/* Mobile hamburger */}
          <button
            className="mobile-nav-toggle"
            style={{ display: 'none', fontSize: '1.2rem', color: '#1a1a1a', padding: '8px', cursor: 'pointer', background: 'none', border: 'none' }}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <i className="fa-solid fa-bars" />
          </button>

          {/* ── Left: Brand ── */}
          <Link to="/" style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: scrolled ? '1.45rem' : '1.65rem',
            color: '#1a1a1a',
            fontStyle: 'italic',
            fontWeight: 600,
            lineHeight: 1,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'font-size 0.3s ease',
            flexShrink: 0,
          }}>
            Sai Deepthi
          </Link>

          {/* ── Center: Nav links + search ── */}
          <div className="desktop-nav" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            flex: 1,
            justifyContent: 'center',
          }}>
            {navLinks.map(({ label, to }) => (
              <Link key={to} to={to} style={{
                color: isActive(to) ? '#d63384' : '#4a4a4a',
                backgroundColor: isActive(to) ? '#fef0f5' : 'transparent',
                padding: '8px 18px',
                borderRadius: '30px',
                fontSize: '0.88rem',
                fontWeight: isActive(to) ? 600 : 400,
                transition: 'all 0.2s',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
                onMouseEnter={e => { if (!isActive(to)) e.currentTarget.style.backgroundColor = '#f8f9fa'; }}
                onMouseLeave={e => { if (!isActive(to)) e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                {label}
              </Link>
            ))}

            {/* Search bar */}
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '8px' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#999', pointerEvents: 'none' }} />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search products…"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{
                      width: '200px',
                      padding: '7px 30px 7px 30px',
                      borderRadius: '20px',
                      border: '1.5px solid #CBC0D3',
                      fontSize: '0.8rem',
                      outline: 'none',
                      background: '#fafafa',
                      fontFamily: 'inherit',
                    }}
                  />
                  {searchQuery && (
                    <button type="button" onClick={() => setSearchQuery('')} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px', display: 'flex' }}>
                      <X size={13} style={{ color: '#aaa' }} />
                    </button>
                  )}
                </div>
                <button type="button" onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', display: 'flex', padding: '4px' }}>
                  <X size={16} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px', borderRadius: '50%', background: 'none', border: 'none', cursor: 'pointer', color: '#666', transition: 'background 0.2s', marginLeft: '4px' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f8f9fa'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
                aria-label="Open search"
              >
                <Search size={17} />
              </button>
            )}
          </div>

          {/* ── Right: Sign In / User + Cart ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>

            {/* Clerk auth controls */}
            {isSignedIn ? (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: { width: '36px', height: '36px', borderRadius: '50%' },
                  },
                }}
              />
            ) : (
              <div className="desktop-nav" style={{ display: 'flex', gap: '6px' }}>
                <SignInButton mode="modal">
                  <button style={{
                    border: '1px solid #e0e0e0', padding: '9px 18px', borderRadius: '30px',
                    fontSize: '0.85rem', fontWeight: 600, color: '#1a1a1a', cursor: 'pointer', background: 'white', whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#1a1a1a'; }}
                  >
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button style={{
                    border: 'none', padding: '9px 18px', borderRadius: '30px',
                    fontSize: '0.85rem', fontWeight: 600, color: '#fff', cursor: 'pointer',
                    background: 'linear-gradient(135deg, #d63384, #b5179e)',
                    whiteSpace: 'nowrap', transition: 'opacity 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                  >
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            )}

            {/* Cart */}
            <button onClick={() => setIsCartOpen(true)} style={{
              border: '1px solid #e0e0e0', width: '40px', height: '40px',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', color: '#1a1a1a', cursor: 'pointer', background: 'white',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#1a1a1a'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#1a1a1a'; e.currentTarget.style.borderColor = '#e0e0e0'; }}
              aria-label="Open cart"
            >
              <i className="fa-solid fa-cart-shopping" style={{ fontSize: '0.9rem' }} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: '-3px', right: '-3px',
                  background: '#d63384', color: '#fff',
                  fontSize: '0.6rem', fontWeight: 700,
                  height: '16px', minWidth: '16px', borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px',
                }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* ── Mobile full-screen menu ── */}
      <div style={{
        position: 'fixed', inset: 0, background: '#fff', zIndex: 400,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '28px',
        transition: 'opacity 0.25s, visibility 0.25s',
        opacity: isMobileMenuOpen ? 1 : 0,
        visibility: isMobileMenuOpen ? 'visible' : 'hidden',
      }}>
        <button onClick={() => setIsMobileMenuOpen(false)} style={{
          position: 'absolute', top: '28px', right: '28px',
          fontSize: '1.4rem', color: '#1a1a1a', background: 'none', border: 'none', cursor: 'pointer',
        }}>
          <i className="fa-solid fa-times" />
        </button>

        <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', color: '#bbb', fontStyle: 'italic', marginBottom: '-12px' }}>Sai Deepthi</p>

        {navLinks.map(({ label, to }) => (
          <Link key={to} to={to}
            style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.2rem', color: isActive(to) ? '#d63384' : '#1a1a1a', textDecoration: 'none' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >{label}</Link>
        ))}

        <Link to="/cart"
          style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.2rem', color: '#1a1a1a', textDecoration: 'none' }}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Cart {cartCount > 0 && <span style={{ fontSize: '1.2rem', color: '#d63384' }}>({cartCount})</span>}
        </Link>

        {isSignedIn ? (
          <UserButton />
        ) : (
          <SignInButton mode="modal">
            <button onClick={() => setIsMobileMenuOpen(false)}
              style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', color: '#1a1a1a', background: 'none', border: 'none', cursor: 'pointer' }}
            >Sign In</button>
          </SignInButton>
        )}
      </div>
    </>
  );
};

export default Navbar;
