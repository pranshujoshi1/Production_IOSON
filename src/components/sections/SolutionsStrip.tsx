import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const solutions = [
  {
    label: 'Water Quality Monitoring',
    sub: 'Real-time IoT sensing',
    desc: 'Continuous multi-parameter water monitoring with instant contamination alerts and compliance reporting.',
    href: '/solutions#monitoring',
  },
  {
    label: 'Smart Automation',
    sub: 'Process intelligence',
    desc: 'Replace manual workflows with automated, event-driven systems that reduce overhead and errors.',
    href: '/solutions#automation',
  },
  {
    label: 'Digital Infrastructure',
    sub: 'Scalable platforms',
    desc: 'Subscription platforms, operational dashboards, and business-critical web systems built to last.',
    href: '/solutions#software',
  },
  {
    label: 'Edge Computing',
    sub: 'Distributed systems',
    desc: 'On-device processing that works even when connectivity fails — critical for field deployments.',
    href: '/solutions#iot',
  },
  {
    label: 'Predictive Analytics',
    sub: 'Data-driven insights',
    desc: 'Turn sensor and transaction data into actionable insights before problems become visible.',
    href: '/solutions#monitoring',
  },
];

const fd = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
});

export function SolutionsStrip() {
  return (
    <section
      aria-label="Solution areas"
      style={{
        background: '#FFFFFF',
        padding: 'clamp(64px,9vw,100px) 0',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div className="container-custom">
        {/* Header */}
        <div className="solutions-header">
          <motion.div {...fd()}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#888', marginBottom: 12 }}>
              What We Build
            </div>
            <h2 style={{
              fontSize: 'clamp(1.5rem,3.5vw,2.625rem)', fontWeight: 700,
              color: '#0D0D0D', letterSpacing: '-.03em', lineHeight: 1.1,
              fontFamily: "'Space Grotesk',sans-serif", margin: 0,
            }}>
              End-to-end intelligent systems
            </h2>
          </motion.div>
          <motion.div {...fd(0.08)} style={{ display: 'flex', alignItems: 'flex-end' }}>
            <Link
              to="/solutions"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 13, fontWeight: 600, color: '#666',
                textDecoration: 'none', transition: 'color .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#0D0D0D'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#666'; }}
            >
              All solutions <ArrowRight size={12} aria-hidden="true"/>
            </Link>
          </motion.div>
        </div>

        {/* Solution rows */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {solutions.map((s, i) => (
            <motion.div
              key={i}
              {...fd(i * 0.06)}
            >
              <Link
                to={s.href}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div
                  className="solution-row"
                  style={{
                    display: 'flex', alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    padding: 'clamp(18px,2.5vw,24px) 0',
                    borderBottom: i < solutions.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none',
                    gap: '1.5rem',
                    cursor: 'pointer',
                    transition: 'opacity .2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.opacity = '0.65'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.opacity = '1'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flex: 1, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 10, color: '#AAA', fontWeight: 600, width: 20, textAlign: 'right', flexShrink: 0 }}>
                      0{i + 1}
                    </span>
                    <div>
                      <span style={{
                        fontSize: 'clamp(0.9375rem,1.8vw,1.125rem)',
                        fontWeight: 600, color: '#0D0D0D', letterSpacing: '-.015em',
                        display: 'block', marginBottom: 3,
                      }}>
                        {s.label}
                      </span>
                      <span style={{ fontSize: 12.5, color: '#666', lineHeight: 1.5, display: 'block', maxWidth: 420 }}>
                        {s.desc}
                      </span>
                    </div>
                  </div>
                  <span style={{ fontSize: 11.5, color: '#AAA', fontWeight: 500, flexShrink: 0, alignSelf: 'center', paddingTop: 2 }}>{s.sub}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .solutions-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: clamp(2rem,4vw,3rem);
          gap: 1.5rem;
          flex-wrap: wrap;
        }
      `}</style>
    </section>
  );
}
