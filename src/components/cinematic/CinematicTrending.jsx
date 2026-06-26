import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import SplitHeading from './SplitHeading';

const trendingItems = [
  { id: 17, subtitle: 'Sarees • Hand-woven' },
  { id: 15, subtitle: 'Ethnic • Occasion' },
  { id: 1, subtitle: "Women's • Casual" },
  { id: 2, subtitle: 'Ethnic • Formal' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const CinematicTrending = () => {
  const trending = trendingItems.map(({ id, subtitle }) => ({
    ...products.find(p => p.id === id),
    subtitle,
  }));

  return (
    <section
      style={{
        padding: '128px 48px',
        background: 'var(--cin-obsidian)',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '80px',
          borderLeft: '4px solid var(--cin-crimson)',
          paddingLeft: '32px',
        }}
      >
        <div>
          <p
            style={{
              color: 'var(--cin-crimson)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontSize: '0.75rem',
              marginBottom: '8px',
              fontWeight: 700,
            }}
          >
            Curated Excellence
          </p>
          <SplitHeading
            as="h2"
            text="Trending Now"
            mode="chars"
            className="font-cinzel"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: 'var(--cin-pearl)',
              lineHeight: 1,
            }}
          />
        </div>
        <Link
          to="/shop"
          style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            borderBottom: '1px solid var(--cin-pearl)',
            paddingBottom: '6px',
            color: 'var(--cin-pearl)',
            textDecoration: 'none',
            transition: 'color 0.3s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--cin-crimson)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--cin-pearl)')}
        >
          View Exhibition
        </Link>
      </motion.div>

      {/* Pedestal grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '48px',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {trending.map((product, i) => (
          <motion.div
            key={product.id}
            className="pedestal-group"
            variants={cardVariants}
            style={{ marginTop: i % 2 === 1 ? '64px' : 0 }}
          >
            <div className="pedestal">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div style={{ padding: '0 8px' }}>
              <h3
                className="font-cinzel"
                style={{
                  fontSize: '1.1rem',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                  color: 'var(--cin-pearl)',
                  letterSpacing: '0.05em',
                }}
              >
                {product.name}
              </h3>
              <p
                style={{
                  fontSize: '0.65rem',
                  color: 'rgba(253, 251, 247, 0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  marginBottom: '12px',
                }}
              >
                {product.subtitle}
              </p>
              <p
                className="font-cinzel"
                style={{
                  fontSize: '1.1rem',
                  color: 'var(--cin-crimson)',
                }}
              >
                ₹{product.price?.toLocaleString('en-IN')}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CinematicTrending;
