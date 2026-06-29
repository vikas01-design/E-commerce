import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, X, ShoppingBag, Menu, Heart, ChevronRight } from 'lucide-react';
import { SignInButton, SignUpButton, UserButton, useAuth, useClerk } from '@clerk/react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const { isSignedIn } = useAuth();

  // Synchronize search input with URL search parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    setSearchQuery(q);
    if (q) {
      setIsSearchOpen(true);
    }
  }, [location.search]);

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    if (location.pathname === '/shop') {
      if (val.trim()) {
        navigate(`/shop?q=${encodeURIComponent(val.trim())}`, { replace: true });
      } else {
        navigate('/shop', { replace: true });
      }
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (location.pathname !== '/shop' && searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    if (location.pathname === '/shop') {
      navigate('/shop', { replace: true });
    }
    setIsSearchOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  // REMOVED About button from navLinks
  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/shop' },
  ];

  const isDarkHeader = location.pathname === '/shop';

  // Dynamic style classes for transparent UI design
  const textColor = isDarkHeader ? 'text-white' : 'text-gray-900';
  const buttonBorder = isDarkHeader ? 'border-white/20 hover:border-white/60' : 'border-gray-200 hover:border-gray-400';
  const buttonBg = isDarkHeader ? 'bg-transparent hover:bg-white/10 text-white' : 'bg-transparent hover:bg-gray-50 text-gray-700';

  return (
    <>
      {/* ─── NAVBAR ─── */}
      <header className="absolute top-0 left-0 right-0 z-[1000] bg-transparent">
        <div className="mx-auto flex h-24 max-w-[1500px] items-center justify-between px-8 lg:px-14">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 select-none group">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" fill={isDarkHeader ? "#ffffff" : "#1a1a1a"}/>
              <path d="M16 8L22 11.5V18.5L16 22L10 18.5V11.5L16 8Z" fill={isDarkHeader ? "#1a1a1a" : "white"}/>
            </svg>
            <span
              className={`font-semibold tracking-tight group-hover:opacity-70 transition-opacity duration-200 ${isDarkHeader ? "text-white" : "text-[#1a1a1a]"}`}
              style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.25rem', fontStyle: 'italic' }}
            >
              Sai Deepthi
            </span>
          </Link>

          {/* ── Center nav pill (Transparent UI Style) ── */}
          <nav className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-8 bg-transparent px-3 py-2">
              {navLinks.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className={`text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-300 relative group whitespace-nowrap ${
                    isActive(to)
                      ? 'text-rust'
                      : isDarkHeader
                        ? 'text-white/80 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span>{label}</span>
                  {/* Elegant active/hover line indicator */}
                  <span className={`absolute -bottom-1 left-0 right-0 h-[1.5px] bg-rust transition-transform duration-300 origin-left ${
                    isActive(to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>
              ))}
            </div>

            {/* Search (only appears when NOT on the homepage) */}
            {location.pathname !== '/' && (
              isSearchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 ml-4">
                  <div className="relative flex items-center">
                    <Search size={14} className={isDarkHeader ? "text-white/50" : "text-gray-400"} />
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search collections..."
                      value={searchQuery}
                      onChange={e => handleSearchChange(e.target.value)}
                      className={`w-40 bg-transparent border-b py-1 pl-2 pr-6 text-xs outline-none transition-all duration-300 ${
                        isDarkHeader 
                          ? 'border-white/20 text-white focus:border-white' 
                          : 'border-gray-300 text-gray-900 focus:border-gray-900'
                      }`}
                    />
                    {searchQuery && (
                      <button type="button" onClick={() => handleSearchChange('')} className="absolute right-1 text-gray-400 hover:text-gray-700 cursor-pointer">
                        <X size={12} />
                      </button>
                    )}
                  </div>
                  <button type="button" onClick={handleClearSearch} className={`${isDarkHeader ? "text-white/60 hover:text-white" : "text-gray-400 hover:text-gray-900"} cursor-pointer`}>
                    <X size={14} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 shadow-sm ${buttonBorder} ${buttonBg}`}
                  aria-label="Search"
                >
                  <Search size={15} />
                </button>
              )
            )}
          </nav>

          {/* ── Right Controls (Transparent UI Style) ── */}
          <div className="flex items-center gap-3 shrink-0">
            {isSignedIn ? (
              <div className="flex items-center gap-3">
                <UserButton appearance={{ elements: { avatarBox: { width: '38px', height: '38px' } } }} />
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-3">
                {/* LOGIN */}
                <SignInButton mode="modal">
                  <button className={`rounded-full border px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 shadow-sm cursor-pointer ${buttonBorder} ${buttonBg}`}>
                    Login
                  </button>
                </SignInButton>

                {/* SIGN UP */}
                <SignUpButton mode="modal">
                  <button className={`rounded-full border px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 shadow-sm cursor-pointer ${
                    isDarkHeader 
                      ? 'bg-white text-gray-900 border-white hover:bg-white/90' 
                      : 'bg-ink-black text-white border-ink-black hover:bg-rust hover:border-rust'
                  }`}>
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            )}

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className={`relative flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 shadow-sm ${buttonBorder} ${buttonBg}`}
              aria-label="Open wishlist"
            >
              <Heart size={15} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rust px-0.5 text-[9px] font-bold text-white shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 shadow-sm ${buttonBorder} ${buttonBg}`}
              aria-label="Open cart"
            >
              <ShoppingBag size={15} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rust px-0.5 text-[9px] font-bold text-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`flex lg:hidden h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 shadow-sm ${buttonBorder} ${buttonBg}`}
              aria-label="Open menu"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* ─── MOBILE MENU ─── */}
      <div
        className={`fixed inset-0 z-[900] bg-white flex flex-col lg:hidden px-8 py-10 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between mb-12">
          <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', fontStyle: 'italic' }} className="font-semibold text-gray-900">
            Sai Deepthi
          </span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200">
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {navLinks.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`rounded-xl px-5 py-4 text-[13px] font-bold uppercase tracking-[0.18em] transition-colors ${
                isActive(to)
                  ? 'bg-ink-black text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile Search - only shown when NOT on the homepage */}
        {location.pathname !== '/' && (
          <form onSubmit={handleSearchSubmit} className="mt-6 relative">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-[14px] outline-none focus:border-gray-400"
            />
          </form>
        )}

        <div className="mt-auto flex flex-col gap-3 pt-8 border-t border-gray-100">
          {isSignedIn ? (
            <UserButton />
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="w-full rounded-full border border-gray-300 py-3.5 text-[13px] font-bold uppercase tracking-[0.18em] text-gray-700 hover:bg-gray-100 transition-colors">
                  Login
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="w-full rounded-full bg-[#1a1a1a] py-3.5 text-[13px] font-bold uppercase tracking-[0.18em] text-white hover:opacity-80 transition-opacity">
                  Sign Up
                </button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
