import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const products = [
  {
    id: 'thalii',
    label: 'Thalii',
    category: 'Meal Subscription Platform',
    description: 'A QR-based subscription and redemption system for canteens, bhojnalayas, and food-service businesses. Replaces manual registers with real-time digital tracking.',
    tags: ['QR Verification', 'Subscription Mgmt', 'Daily Analytics'],
    status: 'live',
    href: '/products/thalii',
  },
  {
    id: 'pramaan',
    label: 'Pramaan',
    category: 'Water Quality Monitoring',
    description: 'An intelligent IoT system for continuous water quality sensing and contamination detection. Currently in active development for municipal and industrial deployments.',
    tags: ['IoT Sensors', 'Real-time Alerts', 'Compliance Reports'],
    status: 'dev',
    href: '/products/pramaan',
  },
];

const fd = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
});

export function ProductsShowcase() {
  return (
    <section aria-label="Featured products" style={{ background: '#FAFAFA', padding: 'clamp(64px,9vw,100px) 0' }}>
      <div className="container-custom">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'clamp(2rem,4vw,3.5rem)', gap: '1.5rem', flexWrap: 'wrap' }}>
          <motion.div {...fd()}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#888', marginBottom: 12 }}>
              Our Products
            </div>
            <h2 style={{
              fontSize: 'clamp(1.5rem,3.5vw,2.625rem)', fontWeight: 700,
              color: '#0D0D0D', letterSpacing: '-.03em', lineHeight: 1.1,
              fontFamily: "'Space Grotesk',sans-serif", margin: 0,
            }}>
              Systems built for real operations
            </h2>
          </motion.div>
          <motion.div {...fd(0.08)}>
            <Link
              to="/products"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#666', textDecoration: 'none', transition: 'color .2s', flexShrink: 0 }}
              onMouseEnter={e => { e.currentTarget.style.color = '#0D0D0D'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#666'; }}
            >
              All products <ArrowRight size={12} aria-hidden="true"/>
            </Link>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="products-showcase-grid">
          {products.map((p, i) => (
            <motion.div key={p.id} {...fd(i * 0.1)}>
              <Link to={p.href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                <div
                  className="product-showcase-card"
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,0,0,0.14)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.07)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,0,0,0.08)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                  }}
                >
                  {/* Card header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, gap: 10, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#888' }}>{p.category}</span>
                    {p.status === 'live'
                      ? <span className="tag-green">Live</span>
                      : <span className="tag-amber">In Development</span>
                    }
                  </div>

                  {/* Product name */}
                  <div style={{
                    fontSize: 'clamp(2rem,5vw,3.25rem)', fontWeight: 800,
                    color: '#0D0D0D', letterSpacing: '-.04em', lineHeight: 1,
                    marginBottom: 16, fontFamily: "'Space Grotesk',sans-serif",
                  }}>{p.label}</div>

                  <p style={{ fontSize: 14, color: '#404040', lineHeight: 1.74, marginBottom: 24, maxWidth: 360 }}>{p.description}</p>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
                    {p.tags.map(t => (
                      <span key={t} style={{
                        padding: '4px 11px', borderRadius: 100,
                        background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.07)',
                        fontSize: 11, fontWeight: 500, color: '#666',
                      }}>{t}</span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#0D0D0D' }}>
                    Learn more <ArrowRight size={12} aria-hidden="true"/>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .products-showcase-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }
        .product-showcase-card {
          background: #FFFFFF;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 16px;
          padding: clamp(24px,3.5vw,40px) clamp(22px,3vw,36px);
          height: 100%;
          transition: border-color .22s, box-shadow .22s;
          cursor: pointer;
        }
        @media (max-width: 640px) {
          .products-showcase-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
