import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { newStockProducts } from '../../data/products';
import SplitHeading from './SplitHeading';

const posterMeta = [
  { num: '01', title: ['Organza', 'Ruffle Dress'] },
  { num: '02', title: ['Kaftan', 'Dress'] },
  { num: '03', title: ['Kids', 'Sherwani Set'] },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } },
};

const CinematicNewArrivals = () => {
  return (
    <section
      style={{
        padding: '128px 48px',
        background: '#000',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '128px', position: 'relative' }}
      >
        <SplitHeading
          as="h2"
          text="THE REVEAL"
          mode="chars"
          className="font-cinzel"
          style={{
            fontSize: 'clamp(4rem, 10vw, 7rem)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            color: 'var(--cin-pearl)',
            opacity: 0.07,
            lineHeight: 1,
            userSelect: 'none',
            display: 'block',
          }}
        />
        <SplitHeading
          as="h2"
          text="Season Premiere"
          mode="reveal"
          className="font-cinzel"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--cin-pearl)',
            position: 'absolute',
            bottom: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
          }}
        />
      </motion.div>

      {/* Poster grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {newStockProducts.map((product, i) => {
          const { num, title } = posterMeta[i];
          return (
            <motion.div
              key={product.id}
              className="poster-card"
              variants={cardVariants}
              style={{ marginTop: i === 1 ? '96px' : 0 }}
            >
              <div className="poster-card-inner">
                {/* Top overlay: number + title */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    padding: '32px',
                    zIndex: 10,
                    pointerEvents: 'none',
                  }}
                >
                  <p className="poster-card-number">{num}</p>
                  <h3 className="poster-card-title">
                    {title[0]}<br />{title[1]}
                  </h3>
                </div>

                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                />

                {/* Bottom CTA */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    padding: '32px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                    zIndex: 10,
                  }}
                >
                  <Link to="/shop" className="poster-card-btn" style={{ display: 'inline-block' }}>Explore Look</Link>
                </div>
              </div>

              <div style={{ padding: '0 4px' }}>
                <p
                  style={{
                    fontSize: '0.65rem',
                    color: 'rgba(253,251,247,0.4)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    marginBottom: '4px',
                  }}
                >
                  {product.category}
                </p>
                <p
                  className="font-cinzel"
                  style={{
                    color: 'var(--cin-pearl)',
                    fontSize: '0.95rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  ₹{product.price?.toLocaleString('en-IN')}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default CinematicNewArrivals;
