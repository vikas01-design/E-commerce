import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import SplitHeading from './SplitHeading';

const dealProducts = [
  products.find(p => p.id === 17),
  products.find(p => p.id === 15),
];

const CinematicDeals = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 59, seconds: 59 });
  const { addToCart } = useCart();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        clearInterval(timer);
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = n => String(n).padStart(2, '0');

  // SVG circle countdown (hours as progress)
  const totalSeconds = timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds;
  const maxSeconds = 12 * 3600;
  const progress = totalSeconds / maxSeconds;
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <section
      style={{
        padding: '128px 48px',
        background: 'var(--cin-crimson)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative orbs */}
      <div
        style={{
          position: 'absolute',
          top: '-128px',
          left: '-128px',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-128px',
          right: '-128px',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '96px',
          alignItems: 'center',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {/* Left: Heading + countdown */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <SplitHeading
            as="h2"
            text={['The', 'Midnight', 'Hour']}
            mode="lines"
            className="font-cinzel"
            style={{
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              textTransform: 'uppercase',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--cin-pearl)',
              marginBottom: '48px',
            }}
          />

          {/* Circular countdown */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '32px',
              background: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: '32px 40px',
              borderRadius: '80px',
              border: '1px solid rgba(253, 251, 247, 0.1)',
            }}
          >
            {/* SVG ring clock */}
            <div style={{ position: 'relative', width: '96px', height: '96px', flexShrink: 0 }}>
              <svg
                width="96"
                height="96"
                style={{ transform: 'rotate(-90deg)' }}
                aria-hidden="true"
              >
                <circle cx="48" cy="48" r={radius} fill="none" stroke="rgba(253,251,247,0.15)" strokeWidth="4" />
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  fill="none"
                  stroke="var(--cin-pearl)"
                  strokeWidth="4"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
              </svg>
              <div
                className="font-cinzel"
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  color: 'var(--cin-pearl)',
                }}
              >
                {pad(timeLeft.hours)}
              </div>
            </div>

            <div>
              <p
                style={{
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: 'rgba(253,251,247,0.6)',
                  marginBottom: '6px',
                }}
              >
                {pad(timeLeft.minutes)}m {pad(timeLeft.seconds)}s remaining
              </p>
              <p
                className="font-cinzel"
                style={{
                  fontSize: '1.2rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: 'var(--cin-pearl)',
                }}
              >
                Limited Access
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right: product cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
          }}
        >
          {dealProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              style={{
                background: 'rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(253,251,247,0.05)',
                marginTop: i === 1 ? '64px' : 0,
              }}
            >
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '12px',
                  marginBottom: '16px',
                  height: '240px',
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  loading="lazy"
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'var(--cin-obsidian)',
                    color: 'var(--cin-pearl)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '4px',
                    letterSpacing: '0.1em',
                  }}
                >
                  SALE
                </span>
              </div>

              <h4
                className="font-cinzel"
                style={{
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  color: 'var(--cin-pearl)',
                  marginBottom: '8px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {product.name}
              </h4>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}
              >
                <span style={{ color: 'rgba(253,251,247,0.5)', fontSize: '0.85rem', textDecoration: 'line-through' }}>
                  ₹{product.originalPrice?.toLocaleString('en-IN')}
                </span>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--cin-pearl)' }}>
                  ₹{product.price?.toLocaleString('en-IN')}
                </span>
              </div>
              <button
                onClick={() => addToCart(product)}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: 'rgba(253,251,247,0.1)',
                  border: '1px solid rgba(253,251,247,0.2)',
                  borderRadius: '8px',
                  color: 'var(--cin-pearl)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontFamily: "'Cinzel', serif",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--cin-pearl)';
                  e.currentTarget.style.color = 'var(--cin-obsidian)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(253,251,247,0.1)';
                  e.currentTarget.style.color = 'var(--cin-pearl)';
                }}
              >
                Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CinematicDeals;
