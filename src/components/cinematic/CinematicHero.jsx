import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const CinematicHero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ['circle(150px at 50% 50%)', 'circle(120vw at 50% 50%)']
  );

  return (
    <div ref={containerRef} style={{ height: '130vh', position: 'relative' }}>
      <section
        style={{
          height: '100vh',
          position: 'sticky',
          top: 0,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
        }}
      >
        {/* Headline overlay — above the video mask */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <motion.h1
            className="font-cinzel"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            style={{
              fontSize: 'clamp(4rem, 12vw, 9rem)',
              textAlign: 'center',
              textTransform: 'uppercase',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              color: 'var(--cin-pearl)',
            }}
          >
            The<br />Art of<br />Grace
          </motion.h1>
        </div>

        {/* Spotlight mask — scroll-driven clip-path expansion */}
        <motion.div
          style={{
            clipPath,
            position: 'absolute',
            inset: 0,
            backgroundColor: '#000',
          }}
        >
          <video
            src="https://www.pexels.com/download/video/7669196/"
            poster="https://images.pexels.com/photos/7669196/pexels-photo-7669196.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(100%) brightness(0.5)',
            }}
          />
          {/* Crimson tint overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(122, 17, 17, 0.1)',
              mixBlendMode: 'overlay',
            }}
          />
        </motion.div>

        {/* Scroll CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: '48px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            pointerEvents: 'auto',
          }}
        >
          <Link to="/shop">
            <button
              style={{
                fontFamily: "'Cinzel', serif",
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                fontSize: '0.7rem',
                border: '1px solid rgba(253, 251, 247, 0.5)',
                padding: '14px 40px',
                background: 'transparent',
                color: 'var(--cin-pearl)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--cin-pearl)';
                e.currentTarget.style.color = 'var(--cin-obsidian)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--cin-pearl)';
              }}
            >
              Enter the Archive
            </button>
          </Link>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: 'rgba(253,251,247,0.4)', fontSize: '1.2rem' }}
          >
            ↓
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default CinematicHero;
