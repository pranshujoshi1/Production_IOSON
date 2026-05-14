import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as unknown as Easing;

const articles = [
  {
    category: 'IoT',
    title: 'How IoT is Changing Water Quality Management in India',
    excerpt: 'Manual water testing catches problems after the fact. Real-time sensor networks catch them the moment they happen — before impact.',
    readTime: '6 min',
    date: 'May 2025',
    href: '/insights/iot-water-quality-monitoring',
  },
  {
    category: 'Product',
    title: "Why Canteens Still Use Paper Registers — And Why That's Changing",
    excerpt: "Most food-service businesses are one missed payment or one miscounted meal away from operational chaos. Here's how digital systems fix that.",
    readTime: '4 min',
    date: 'April 2025',
    href: '/insights/qr-meal-subscription-future',
  },
  {
    category: 'Engineering',
    title: 'The Gap Between a Demo and a Production System',
    excerpt: "A system that works in the demo room often fails in the field. Here's what we've learned building systems that survive real-world conditions.",
    readTime: '8 min',
    date: 'March 2025',
    href: '/insights/automation-production',
  },
];

const fd = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { delay, duration: 0.5, ease: EASE },
});

export function InsightsPreview() {
  return (
    <section aria-label="Latest insights" style={{ background: '#F5F5F5', padding: 'clamp(64px,9vw,100px) 0', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
      <div className="container-custom">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'clamp(2rem,4vw,3.5rem)', gap: '1.5rem', flexWrap: 'wrap' }}>
          <motion.div {...fd()}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#888', marginBottom: 12 }}>Insights</div>
            <h2 style={{
              fontSize: 'clamp(1.5rem,3.5vw,2.625rem)', fontWeight: 700,
              color: '#0D0D0D', letterSpacing: '-.03em', lineHeight: 1.1,
              fontFamily: "'Space Grotesk',sans-serif", margin: 0,
            }}>Thinking in public</h2>
          </motion.div>
          <motion.div {...fd(0.08)}>
            <Link
              to="/insights"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#666', textDecoration: 'none', transition: 'color .2s', flexShrink: 0 }}
              onMouseEnter={e => { e.currentTarget.style.color = '#0D0D0D'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#666'; }}
            >
              All articles <ArrowRight size={12} aria-hidden="true"/>
            </Link>
          </motion.div>
        </div>

        <div className="insights-preview-grid">
          {articles.map((a, i) => (
            <motion.div key={a.href} {...fd(i * 0.09)}>
              <Link to={a.href} style={{ textDecoration: 'none', display: 'flex', height: '100%' }}>
                <div
                  className="insight-preview-card"
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,0,0,0.14)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.06)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,0,0,0.08)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                    <span style={{ padding: '3px 10px', borderRadius: 100, background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.07)', fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#666' }}>{a.category}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#888' }}>
                      <Clock size={10} aria-hidden="true"/> {a.readTime}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: '#0D0D0D', lineHeight: 1.5, marginBottom: 10, letterSpacing: '-.01em', flex: '1 1 auto' }}>{a.title}</h3>
                  <p style={{ fontSize: 13, color: '#404040', lineHeight: 1.74, marginBottom: 20, flex: '1 1 auto' }}>{a.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid rgba(0,0,0,0.06)', marginTop: 'auto' }}>
                    <span style={{ fontSize: 11, color: '#888' }}>{a.date}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: '#404040' }}>Read <ArrowRight size={10} aria-hidden="true"/></span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .insights-preview-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        .insight-preview-card {
          background: #FFFFFF;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 14px;
          padding: clamp(22px,3vw,32px);
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: border-color .22s, box-shadow .22s;
        }
        @media (max-width: 900px) { .insights-preview-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 560px) { .insights-preview-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
