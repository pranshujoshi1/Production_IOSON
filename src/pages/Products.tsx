import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { CTABanner } from '@/components/sections/CTABanner';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { delay, duration: 0.5 },
});

const products = [
  {
    id: 'thalii', name: 'Thalii', category: 'SaaS Platform',
    tagline: 'QR-Based Meal Subscription & Customer Management',
    description: 'A complete digital operations platform for food-service businesses. Replaces paper tracking and fragmented customer records with a unified, QR-driven system.',
    capabilities: ['QR code subscription sign-up & verification','Real-time meal redemption tracking','Customer portal with subscription management','Kitchen dashboard with live order queue','Consumption analytics & churn signals','Digital wallet and top-up flows'],
    href: '/products/thalii', dark: false,
  },
  {
    id: 'pramaan', name: 'Pramaan', category: 'IoT Hardware + Software',
    tagline: 'Intelligent Water Quality Monitoring System',
    description: 'Deploys precision sensors to continuously track water quality, detect contamination in real time, and trigger operator alerts before public health impact occurs.',
    capabilities: ['Multi-parameter sensing (pH, turbidity, TDS, temp)','Real-time contamination event detection','Automated SMS, app & email alerting','Historical trend visualization','Compliance-ready reporting & audit logs','Edge processing for low-latency detection'],
    href: '/products/pramaan', dark: true,
  },
];

function MiniDashboard({ dark, name }: { dark: boolean; name: string }) {
  const bg = dark ? '#1E1E1E' : '#fff';
  const border = dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.08)';
  const textColor = dark ? '#F5F5F5' : '#0D0D0D';
  const subColor = dark ? '#4B4B4B' : '#8C8C8C';
  const bars = name === 'Thalii'
    ? [{ l: 'QR Scans Today', v: 84 }, { l: 'Active Subs', v: 67 }, { l: 'Revenue Rate', v: 91 }]
    : [{ l: 'Water Quality', v: 96 }, { l: 'Sensor Network', v: 100 }, { l: 'Alert Queue', v: 5 }];
  return (
    <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 14, padding: 'clamp(18px,3vw,24px)', boxShadow: dark ? '0 24px 48px rgba(0,0,0,.4)' : '0 24px 48px rgba(0,0,0,.08)', width: '100%', maxWidth: 340 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} aria-hidden="true"/>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#22C55E' }}>Live</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: subColor }}>{name}</span>
      </div>
      {bars.map((b, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontSize: 12, color: subColor, fontWeight: 500 }}>{b.l}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: textColor }}>{b.v}%</span>
          </div>
          <div style={{ height: 4, borderRadius: 2, background: dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.07)', overflow: 'hidden' }}>
            <motion.div initial={{ width: 0 }} whileInView={{ width: `${b.v}%` }}
              viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.15, duration: 0.8, ease: 'easeOut' }}
              style={{ height: '100%', borderRadius: 2, background: b.v > 80 ? '#22C55E' : '#2563EB' }}/>
          </div>
        </div>
      ))}
      <div style={{ marginTop: 16, paddingTop: 12, borderTop: `1px solid ${dark ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.06)'}`, display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, color: subColor }}>All systems nominal</span>
        <span style={{ fontSize: 11, color: '#22C55E', fontWeight: 600 }}>✓ Operational</span>
      </div>
    </div>
  );
}

export default function Products() {
  return (
    <>
      <Helmet>
        <title>Products — IOSON</title>
        <meta name="description" content="IOSON products: Thalii (QR meal subscription platform) and Pramaan (IoT water quality monitoring). Purpose-built technology for real operations." />
        <meta property="og:title" content="Products — IOSON" />
        <meta property="og:description" content="Thalii and Pramaan — deeply engineered, production-proven products built for real-world operations." />
      </Helmet>

      {/* Hero */}
      <section style={{ background: '#F5F5F5', paddingTop: 'clamp(96px,14vw,128px)', paddingBottom: 'clamp(48px,7vw,80px)' }}>
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8C8C8C', marginBottom: 18 }}>Our Products</div>
            <h1 style={{ fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-.04em', lineHeight: 1.04, fontFamily: "'Space Grotesk',sans-serif", margin: '0 0 18px', maxWidth: 620 }}>
              Built for real operations.
            </h1>
            <p style={{ fontSize: 'clamp(0.9375rem,1.5vw,1.0625rem)', color: '#4B4B4B', lineHeight: 1.75, maxWidth: 460, margin: 0 }}>
              Two products, two distinct domains — engineered with precision, deployed in production, designed to scale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      {products.map((p, i) => (
        <section key={p.id} id={p.id} style={{ background: p.dark ? '#0D0D0D' : '#F5F5F5', padding: 'clamp(56px,9vw,96px) 0' }}>
          <div className="container-custom">
            <div className={`product-row${i % 2 === 1 ? ' product-row-reverse' : ''}`}>
              <motion.div {...fade(0.1)} className="product-text">
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: p.dark ? '#4B4B4B' : '#8C8C8C', marginBottom: 14 }}>{p.category}</div>
                <h2 style={{ fontSize: 'clamp(1.875rem,4vw,3.25rem)', fontWeight: 800, color: p.dark ? '#F5F5F5' : '#0D0D0D', letterSpacing: '-.04em', lineHeight: 1.04, fontFamily: "'Space Grotesk',sans-serif", marginBottom: 10 }}>{p.name}</h2>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#2563EB', marginBottom: 14 }}>{p.tagline}</div>
                <p style={{ fontSize: 14, color: p.dark ? '#4B4B4B' : '#4B4B4B', lineHeight: 1.78, marginBottom: 24, maxWidth: 400 }}>{p.description}</p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
                  {p.capabilities.map(c => (
                    <li key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13, color: p.dark ? '#8C8C8C' : '#4B4B4B' }}>
                      <CheckCircle size={13} style={{ color: '#22C55E', flexShrink: 0, marginTop: 1 }} aria-hidden="true"/>{c}
                    </li>
                  ))}
                </ul>
                <Link to={p.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderRadius: 6, background: p.dark ? '#F5F5F5' : '#0D0D0D', color: p.dark ? '#0D0D0D' : '#F5F5F5', fontSize: 13, fontWeight: 700, textDecoration: 'none', transition: 'opacity .2s', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}>
                  Explore {p.name} <ArrowRight size={13} aria-hidden="true"/>
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 24, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}
                className="product-visual" style={{ display: 'flex', justifyContent: 'center' }}>
                <MiniDashboard dark={p.dark} name={p.name}/>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      <CTABanner/>

      <style>{`
        .product-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2.5rem, 5vw, 5rem);
          align-items: center;
        }
        .product-text { order: 1; }
        .product-visual { order: 2; }
        .product-row-reverse .product-text  { order: 2; }
        .product-row-reverse .product-visual { order: 1; }

        @media (max-width: 768px) {
          .product-row { grid-template-columns: 1fr; gap: 2.5rem; }
          .product-text  { order: 1 !important; }
          .product-visual { display: none !important; }
        }
      `}</style>
    </>
  );
}
