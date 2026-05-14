import { motion } from 'framer-motion';

const stats = [
  { value: '99.98%', label: 'System uptime',    sub: 'Across all live deployments' },
  { value: '<2s',    label: 'QR scan time',      sub: 'Meal redemption speed'       },
  { value: '340+',   label: 'Active nodes',      sub: 'Sensor network size'         },
  { value: '100%',   label: 'SLA delivered',     sub: 'Every quarter since launch'  },
];

const fd = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
});

export function StatsSection() {
  return (
    <section aria-label="Key performance metrics" style={{ background: '#FAFAFA', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
      <div className="container-custom">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <motion.div key={i} {...fd(i * 0.08)} className="stat-item">
              <div style={{
                fontSize: 'clamp(1.75rem,4vw,3rem)',
                fontWeight: 800, color: '#0D0D0D',
                lineHeight: 1, letterSpacing: '-.04em',
                marginBottom: 8,
                fontFamily: "'Space Grotesk', sans-serif",
              }}>{s.value}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 3 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: '#888', lineHeight: 1.5 }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(0,0,0,0.07);
        }
        .stat-item {
          background: #FAFAFA;
          padding: clamp(28px,4vw,44px) clamp(20px,3vw,32px);
        }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 400px) {
          .stats-grid { grid-template-columns: 1fr; }
          .stat-item  { padding: 24px 0; background: transparent; border-bottom: 1px solid rgba(0,0,0,.07); }
        }
      `}</style>
    </section>
  );
}
