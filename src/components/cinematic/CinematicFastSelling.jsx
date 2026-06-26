import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { fastSellingProducts } from '../../data/products';
import SplitHeading from './SplitHeading';

const demandData = [
  { pct: 85, label: 'Only 4 pieces remaining' },
  { pct: 72, label: 'Rapidly depleting' },
  { pct: 94, label: 'Final piece in stock' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const CinematicFastSelling = () => {
  const { addToCart } = useCart();

  return (
    <section
      style={{
        padding: '128px 48px',
        background: 'var(--cin-obsidian)',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '80px' }}
      >
        <SplitHeading
          as="h2"
          text="High Demand"
          mode="glitch"
          className="font-cinzel"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--cin-pearl)',
            marginBottom: '12px',
          }}
        />
        <p
          style={{
            color: 'rgba(253,251,247,0.35)',
            fontSize: '0.7rem',
            fontWeight: 400,
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
          }}
        >
          Pieces vanishing from the archive
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '64px',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {fastSellingProducts.map((product, i) => {
          const { pct, label } = demandData[i];
          return (
            <motion.div
              key={product.id}
              variants={cardVariants}
              style={{
                position: 'relative',
                background: 'rgba(255,255,255,0.04)',
                padding: '32px',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              {/* Rising demand bar */}
              <motion.div
                className="rising-demand"
                initial={{ height: 0 }}
                whileInView={{ height: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: 'easeOut', delay: i * 0.15 }}
              />

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '32px',
                  }}
                >
                  <img
                    src={`${product.image?.split('?')[0]}?w=100&h=100&fit=crop`}
                    alt={product.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '12px',
                      objectFit: 'cover',
                      filter: 'grayscale(100%)',
                    }}
                    loading="lazy"
                  />
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: 'var(--cin-crimson)',
                    }}
                  >
                    {pct}% SOLD
                  </span>
                </div>

                <h3
                  className="font-cinzel"
                  style={{
                    fontSize: '1.4rem',
                    textTransform: 'uppercase',
                    color: 'var(--cin-pearl)',
                    marginBottom: '8px',
                    letterSpacing: '0.05em',
                  }}
                >
                  {product.name}
                </h3>
                <p
                  style={{
                    fontSize: '0.65rem',
                    color: 'rgba(253,251,247,0.4)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    marginBottom: '32px',
                  }}
                >
                  {label}
                </p>

                <button
                  onClick={() => addToCart(product)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'var(--cin-pearl)',
                    color: 'var(--cin-obsidian)',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    fontFamily: "'Cinzel', serif",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--cin-crimson)';
                    e.currentTarget.style.color = 'var(--cin-pearl)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'var(--cin-pearl)';
                    e.currentTarget.style.color = 'var(--cin-obsidian)';
                  }}
                >
                  Secure Access
                </button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default CinematicFastSelling;
