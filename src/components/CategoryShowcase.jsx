import { Link } from 'react-router-dom';

const categories = [
  {
    key: 'bestsellers',
    label: 'Bestsellers',
    sub: 'Shop The Edit →',
    image: '/pexels-susheelparihar-33180676.jpg',
    to: '/shop',
    large: true,
  },
  {
    key: 'new-arrivals',
    label: 'New Arrivals',
    sub: 'View Collection →',
    image: '/pexels-thrissurkaranphotography-29873543.jpg',
    to: '/shop',
  },
  {
    key: 'recommended',
    label: 'Recommended',
    sub: 'Shop Now →',
    image: '/pexels-theamritdev-36026381.jpg',
    to: '/shop',
  },
];

const CategoryShowcase = () => {
  return (
    <section className="section section-soft animate-on-scroll">
      <div className="container">

        {/* Header */}
        <div style={{ marginBottom: '44px' }}>
          <div className="section-accent">
            <div className="section-accent-line" />
            <span className="section-accent-label">Featured Picks</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', color: 'var(--text-main)', marginBottom: '10px' }}>
            Start with these collections
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Bestsellers, new arrivals, and recommended picks — browse each category below.
          </p>
        </div>

        {/* Grid */}
        <div className="collections-grid">
          {categories.map(cat => (
            <Link
              key={cat.key}
              to={cat.to}
              className={`img-wrap collection-card card-${cat.key}`}
              style={{ position: 'relative', borderRadius: '18px', overflow: 'hidden', display: 'block', textDecoration: 'none' }}
            >
              <img
                src={cat.image}
                alt={cat.label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', transition: 'transform 0.55s ease' }}
              />
              {/* Gradient overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
                borderRadius: '18px', pointerEvents: 'none',
              }} />
              {/* Text */}
              <div style={{ position: 'absolute', bottom: '26px', left: '26px', color: '#fff' }}>
                <h3 style={{
                  fontSize: cat.large ? '2.1rem' : '1.6rem',
                  marginBottom: '6px',
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 600,
                  lineHeight: 1.1,
                }}>
                  {cat.label}
                </h3>
                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600, opacity: 0.9 }}>
                  {cat.sub}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .collections-grid {
          display: grid;
          gap: 16px;
          height: 560px;
          grid-template-columns: 1.1fr 1fr;
          grid-template-rows: 1fr 1fr;
        }
        .card-bestsellers  { grid-column: 1 / 2; grid-row: 1 / 3; }
        .card-new-arrivals { grid-column: 2 / 3; grid-row: 1 / 2; }
        .card-recommended  { grid-column: 2 / 3; grid-row: 2 / 3; }

        .collection-card:hover img { transform: scale(1.05); }

        @media (max-width: 768px) {
          .collections-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            height: auto;
          }
          .card-bestsellers,
          .card-new-arrivals,
          .card-recommended { grid-column: 1 / 2; grid-row: auto; min-height: 260px; }
        }
      `}</style>
    </section>
  );
};

export default CategoryShowcase;
