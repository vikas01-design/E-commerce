import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { products } from '../data/products';

const Trending = () => {
  const trendingProducts = products.filter(p => [2, 5, 10, 15].includes(p.id));

  return (
    <section className="section section-white animate-on-scroll">
      <div className="container">

        {/* Header */}
        <div style={{ marginBottom: '44px' }}>
          <div className="section-accent">
            <div className="section-accent-line"></div>
            <span className="section-accent-label">Most Loved</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(1.9rem, 4vw, 2.5rem)',
            color: 'var(--text-main)',
            letterSpacing: '0.01em',
          }}>
            Trending Now
          </h2>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '24px',
        }}>
          {trendingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '52px' }}>
          <Link to="/shop">
            <button className="btn-outline">View All Products</button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Trending;
