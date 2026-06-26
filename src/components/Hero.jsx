import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* Background image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center 20%',
      }}>
        {/* Subtle overlay so text is readable */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(160deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.62) 100%)',
        }} />
      </div>

      {/* Text content — hero-fade-in is immediate, NOT scroll-triggered */}
      <div
        className="container hero-fade-in"
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <p style={{
          textTransform: 'uppercase',
          letterSpacing: '0.28em',
          fontSize: '0.75rem',
          marginBottom: '20px',
          color: '#1a1a1a',
          fontWeight: 700,
        }}>
          The New Standard
        </p>

        <h1 style={{
          fontSize: 'clamp(3rem, 7vw, 5.5rem)',
          color: '#1a1a1a',
          marginBottom: '18px',
          letterSpacing: '0.02em',
          lineHeight: 1.08,
          fontFamily: '"Playfair Display", serif',
        }}>
          Elegance Defined.
        </h1>

        <p style={{
          fontSize: '1rem',
          color: '#555',
          marginBottom: '44px',
          maxWidth: '400px',
          lineHeight: 1.7,
        }}>
          Curated womenswear &amp; ethnic fashion crafted with quiet grace.
        </p>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/shop">
            <button className="btn-primary">Shop Now</button>
          </Link>
          <button className="btn-outline">View Lookbook</button>
        </div>
      </div>

      {/* White fade at the bottom edge */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100px',
        background: 'linear-gradient(to bottom, transparent 0%, #FAFAFA 100%)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />
    </section>
  );
};

export default Hero;
