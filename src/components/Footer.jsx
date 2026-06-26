import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#ffffff',
      padding: '72px 0 36px',
      borderTop: '1px solid #eeeeee',
    }}>
      <div className="container">

        {/* Top grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '48px',
          marginBottom: '60px',
        }}>

          {/* Brand + newsletter */}
          <div style={{ gridColumn: 'span 1', minWidth: '220px' }}>
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.9rem',
              marginBottom: '10px',
              color: '#1a1a1a',
              fontStyle: 'italic',
              fontWeight: 600,
            }}>
              Sai Deepthi
            </h2>
            <p style={{ color: '#666', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '8px' }}>
              Soft tailoring &bull; Quiet grace
            </p>
            <p style={{ color: '#999', fontSize: '0.82rem', marginBottom: '24px', lineHeight: 1.6 }}>
              Subscribe to receive updates and exclusive deals.
            </p>
            <div style={{
              display: 'flex',
              borderBottom: '1px solid #1a1a1a',
              paddingBottom: '10px',
              maxWidth: '320px',
            }}>
              <input
                type="email"
                placeholder="Your email address"
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  fontSize: '0.85rem',
                  color: '#1a1a1a',
                  fontFamily: 'inherit',
                }}
              />
              <button style={{
                textTransform: 'uppercase',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                color: '#1a1a1a',
                fontWeight: 600,
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                whiteSpace: 'nowrap',
                paddingLeft: '12px',
                fontFamily: 'inherit',
              }}>
                Subscribe
              </button>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 style={{
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.75rem',
              marginBottom: '20px',
              color: '#1a1a1a',
              fontWeight: 700,
            }}>
              Shop
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: "Women's Wear", to: '/shop' },
                { label: 'Kids Wear', to: '/shop' },
                { label: 'Sarees', to: '/shop' },
                { label: 'New Arrivals', to: '/shop' },
                { label: 'Sale', to: '/shop' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    style={{ color: '#888', fontSize: '0.88rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'}
                    onMouseLeave={e => e.currentTarget.style.color = '#888'}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 style={{
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.75rem',
              marginBottom: '20px',
              color: '#1a1a1a',
              fontWeight: 700,
            }}>
              Help
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Contact Us', 'Shipping Policy', 'Returns & Exchange', 'Track Order', 'FAQs'].map(link => (
                <li key={link}>
                  <a
                    href="#"
                    style={{ color: '#888', fontSize: '0.88rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'}
                    onMouseLeave={e => e.currentTarget.style.color = '#888'}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.75rem',
              marginBottom: '20px',
              color: '#1a1a1a',
              fontWeight: 700,
            }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['About Us', 'Our Story', 'Sustainability', 'Careers', 'Privacy Policy'].map(link => (
                <li key={link}>
                  <a
                    href="#"
                    style={{ color: '#888', fontSize: '0.88rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'}
                    onMouseLeave={e => e.currentTarget.style.color = '#888'}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '28px',
          borderTop: '1px solid #eeeeee',
          gap: '16px',
        }}>
          <p style={{ color: '#aaa', fontSize: '0.78rem' }}>
            &copy; {new Date().getFullYear()} Sai Deepthi Dresses. All rights reserved.
          </p>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {[
              { icon: 'fa-instagram', href: '#' },
              { icon: 'fa-facebook-f', href: '#' },
              { icon: 'fa-twitter', href: '#' },
              { icon: 'fa-pinterest-p', href: '#' },
            ].map(({ icon, href }) => (
              <a
                key={icon}
                href={href}
                style={{
                  width: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  border: '1px solid #e0e0e0',
                  color: '#666',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#1a1a1a';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = '#1a1a1a';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#666';
                  e.currentTarget.style.borderColor = '#e0e0e0';
                }}
              >
                <i className={`fa-brands ${icon}`}></i>
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
