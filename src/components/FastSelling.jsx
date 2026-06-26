import SectionTitle from './SectionTitle';
import ProductCard from './ProductCard';
import { fastSellingProducts } from '../data/products';

const FastSelling = () => {
  return (
    <section className="section section-white animate-on-scroll">
      <div className="container">

        <SectionTitle title="Fast Selling" underlineColor="#FF9500" />

        {/* Progress indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 600,
            }}>
              🔥 Moving Fast
            </span>
            <div style={{
              width: '120px',
              height: '5px',
              background: 'rgba(255, 149, 0, 0.15)',
              borderRadius: '3px',
              overflow: 'hidden',
            }}>
              <div style={{
                width: '60%',
                height: '100%',
                background: 'linear-gradient(to right, #FF9500, #ffb347)',
                borderRadius: '3px',
                animation: 'pulseBar 2s infinite ease-in-out',
              }} />
            </div>
            <span style={{
              fontSize: '0.75rem',
              color: '#FF9500',
              fontWeight: 700,
            }}>
              Selling quickly
            </span>
          </div>
        </div>

        <style>{`
          @keyframes pulseBar {
            0%   { transform: translateX(-110%); }
            100% { transform: translateX(210%); }
          }
        `}</style>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {fastSellingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FastSelling;
