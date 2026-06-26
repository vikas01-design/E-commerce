import { Truck, RefreshCw, Lock, Star } from 'lucide-react';

const badges = [
  { icon: Truck,     title: 'Free Shipping',    sub: 'On orders above ₹999' },
  { icon: RefreshCw, title: 'Easy Returns',      sub: '7-day hassle-free returns' },
  { icon: Lock,      title: 'Secure Payments',   sub: '100% safe & encrypted' },
  { icon: Star,      title: 'Quality Assured',   sub: 'Curated premium fabrics' },
];

export default function TrustStrip() {
  return (
    <div style={{
      background: '#1a1a1a',
      padding: '36px 0',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '28px',
        }}>
          {badges.map(({ icon: Icon, title, sub }) => (
            <div key={title} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon size={19} color="#EFD3D7" strokeWidth={1.5} />
              </div>
              <div>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff', marginBottom: '2px', fontFamily: 'inherit' }}>
                  {title}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>
                  {sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
