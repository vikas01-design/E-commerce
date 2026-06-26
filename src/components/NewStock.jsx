import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import ProductCard from './ProductCard';
import { newStockProducts } from '../data/products';

const NewStock = () => {
  return (
    <section className="section section-soft animate-on-scroll">
      <div className="container">

        <SectionTitle title="New Stock" underlineColor="#9c27b0" />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {newStockProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link to="/shop">
            <button className="btn-primary">Browse All New Arrivals</button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default NewStock;
