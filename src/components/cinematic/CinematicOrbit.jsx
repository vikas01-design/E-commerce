import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import SplitHeading from './SplitHeading';

const categories = [
  {
    label: "Women's Wear",
    sub: 'Timeless elegance',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&w=800&q=85&fit=crop&crop=top',
    shopLink: '/shop?category=Women%27s+Wear',
    accent: '#7A1111',
    shape: 'circle',
    parallaxSpeed: -70,
  },
  {
    label: 'Sarees',
    sub: 'Pure tradition',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&w=800&q=85&fit=crop&crop=top',
    shopLink: '/shop?category=Sarees',
    accent: '#c9a84c',
    shape: 'rect',
    parallaxSpeed: -110,
  },
  {
    label: 'Ethnic Wear',
    sub: 'Festive spirit',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&w=800&q=85&fit=crop&crop=top',
    shopLink: '/shop?category=Ethnic+Wear',
    accent: '#7A1111',
    shape: 'rect',
    parallaxSpeed: -90,
  },
  {
    label: 'Kids Wear',
    sub: 'Little royals',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&w=800&q=85&fit=crop&crop=top',
    shopLink: '/shop?category=Kids+Wear',
    accent: '#8E9AAF',
    shape: 'circle',
    parallaxSpeed: -55,
  },
];

function CircleCard({ cat, index, sectionRef }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [cat.parallaxSpeed, -cat.parallaxSpeed]);

  return (
    <motion.div
      style={{ y }}
      className="oc-circle-wrapper"
      initial={{ opacity: 0, scale: 0.75 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
    >
      <Link to={cat.shopLink} className="oc-circle" style={{ '--accent': cat.accent }}>
        <div className="oc-circle-img">
          <img src={cat.image} alt={cat.label} loading="lazy" />
          <div className="oc-circle-overlay" />
        </div>
        <div className="oc-circle-ring" aria-hidden="true" />
        <div className="oc-circle-label">
          <p className="oc-sub">{cat.sub}</p>
          <h3 className="oc-name">{cat.label}</h3>
          <span className="oc-shop">Shop →</span>
        </div>
      </Link>
    </motion.div>
  );
}

function RectCard({ cat, index, sectionRef }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [cat.parallaxSpeed, -cat.parallaxSpeed]);

  return (
    <motion.div
      style={{ y }}
      className="oc-rect-wrapper"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
    >
      <Link to={cat.shopLink} className="oc-rect" style={{ '--accent': cat.accent }}>
        <div className="oc-rect-img">
          <img src={cat.image} alt={cat.label} loading="lazy" />
          <div className="oc-rect-gradient" />
          <div className="oc-rect-glow" />
        </div>
        <span className="oc-rect-num" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="oc-rect-info">
          <p className="oc-sub">{cat.sub}</p>
          <h3 className="oc-name">{cat.label}</h3>
          <div className="oc-rect-line" />
          <span className="oc-shop">Shop →</span>
        </div>
      </Link>
    </motion.div>
  );
}

const CinematicOrbit = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgScale   = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const headY     = useTransform(scrollYProgress, [0, 0.5], [40, -20]);
  const headAlpha = useTransform(scrollYProgress, [0, 0.15, 0.5], [0, 1, 1]);

  return (
    <section ref={sectionRef} className="oc-section">

      <motion.div className="orbit-bg" style={{ scale: bgScale }} aria-hidden="true" />

      <div className="orbit-grid-lines" aria-hidden="true">
        {[...Array(5)].map((_, i) => <div key={i} className="orbit-grid-line" />)}
      </div>

      {/* Header */}
      <motion.div className="orbit-header" style={{ y: headY, opacity: headAlpha }}>
        <p className="orbit-eyebrow">— The Collection —</p>

        <SplitHeading
          as="h2"
          text={['Discover', 'Your World']}
          mode="lines"
          className="font-cinzel orbit-title"
        />

        <motion.div
          className="orbit-title-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
      </motion.div>

      {/* Mixed layout */}
      <div className="oc-layout">
        {categories.map((cat, i) =>
          cat.shape === 'circle'
            ? <CircleCard key={cat.label} cat={cat} index={i} sectionRef={sectionRef} />
            : <RectCard   key={cat.label} cat={cat} index={i} sectionRef={sectionRef} />
        )}
      </div>

      {/* Bottom CTA */}
      <motion.div
        className="orbit-bottom-cta"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <Link to="/shop" className="orbit-cta-btn">
          <span>View All Collections</span>
          <svg width="20" height="10" viewBox="0 0 20 10" fill="none" aria-hidden="true">
            <path d="M0 5h18M14 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </motion.div>

    </section>
  );
};

export default CinematicOrbit;
