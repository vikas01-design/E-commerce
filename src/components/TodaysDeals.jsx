import { useState, useEffect } from 'react';
import SectionTitle from './SectionTitle';
import ProductCard from './ProductCard';
import { todaysDealsProducts } from '../data/products';

const TodaysDeals = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        clearInterval(timer);
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = n => String(n).padStart(2, '0');

  return (
    <section className="section section-soft animate-on-scroll">
      <div className="container">

        <SectionTitle title="Today's Deals" underlineColor="#e11d48" />

        {/* Countdown */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#fff',
            border: '1px solid #f0e6ea',
            borderRadius: '50px',
            padding: '12px 28px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
              Ends in
            </span>
            {[pad(timeLeft.hours), pad(timeLeft.minutes), pad(timeLeft.seconds)].map((val, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {i > 0 && <span style={{ color: '#e11d48', fontWeight: 700 }}>:</span>}
                <span style={{
                  display: 'inline-flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: '#e11d48',
                  color: '#fff',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  borderRadius: '8px',
                  padding: '4px 10px',
                  minWidth: '42px',
                  lineHeight: 1.3,
                }}>
                  {val}
                  <span style={{ fontSize: '0.55rem', fontFamily: 'inherit', fontWeight: 500, opacity: 0.85, letterSpacing: '0.05em' }}>
                    {i === 0 ? 'HRS' : i === 1 ? 'MIN' : 'SEC'}
                  </span>
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Products */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {todaysDealsProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TodaysDeals;
