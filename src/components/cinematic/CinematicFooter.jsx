import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SplitHeading from './SplitHeading';

const CinematicFooter = () => {
  return (
    <footer
      style={{
        padding: '96px 48px 48px',
        background: 'var(--cin-obsidian)',
        borderTop: '1px solid rgba(253,251,247,0.05)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: '64px',
          marginBottom: '80px',
          maxWidth: '1280px',
          margin: '0 auto 80px',
        }}
      >
        {/* Brand */}
        <div>
          <SplitHeading
            as="h2"
            text="Sai Deepthi"
            mode="words"
            className="font-cinzel"
            style={{
              fontSize: '2rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--cin-pearl)',
              marginBottom: '24px',
            }}
          />
          <p
            style={{
              maxWidth: '380px',
              color: 'rgba(253,251,247,0.45)',
              lineHeight: 1.8,
              fontSize: '0.9rem',
              fontWeight: 300,
              marginBottom: '40px',
            }}
          >
            A curated boutique of soft tailoring and quiet grace — blending timeless ethnic craftsmanship with a bold, modern aesthetic. Every piece tells a story.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {[
              { icon: 'fa-instagram', href: '#' },
              { icon: 'fa-pinterest-p', href: '#' },
              { icon: 'fa-youtube', href: '#' },
            ].map(({ icon, href }) => (
              <a
                key={icon}
                href={href}
                style={{
                  color: 'rgba(253,251,247,0.5)',
                  fontSize: '1.2rem',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--cin-crimson)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(253,251,247,0.5)')}
                aria-label={icon}
              >
                <i className={`fa-brands ${icon}`} />
              </a>
            ))}
          </div>
        </div>

        {/* Collection links */}
        <div>
          <h4
            className="font-cinzel"
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontSize: '0.8rem',
              color: 'var(--cin-pearl)',
              marginBottom: '28px',
            }}
          >
            The Collection
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {['New Arrivals', 'Bestsellers', 'Bridal Archive', 'The Vault'].map(item => (
              <li key={item}>
                <Link
                  to="/shop"
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 300,
                    color: 'rgba(253,251,247,0.5)',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--cin-pearl)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(253,251,247,0.5)')}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Studio links */}
        <div>
          <h4
            className="font-cinzel"
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontSize: '0.8rem',
              color: 'var(--cin-pearl)',
              marginBottom: '28px',
            }}
          >
            The Studio
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {['Contact Us', 'Shipping & Returns', 'Size Guide', 'Our Story'].map(item => (
              <li key={item}>
                <a
                  href="#"
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 300,
                    color: 'rgba(253,251,247,0.5)',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--cin-pearl)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(253,251,247,0.5)')}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div
        style={{
          textAlign: 'center',
          paddingTop: '48px',
          borderTop: '1px solid rgba(253,251,247,0.05)',
          fontSize: '0.65rem',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: 'rgba(253,251,247,0.25)',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        © {new Date().getFullYear()} Sai Deepthi Boutique • Soft Tailoring · Quiet Grace
      </div>
    </footer>
  );
};

export default CinematicFooter;
