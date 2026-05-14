import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CTABanner } from '@/components/sections/CTABanner';

const fd = (d = 0) => ({ initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-50px' }, transition: { delay: d, duration: 0.52, ease: [0.22,1,0.36,1] } });

const solutions = [
  {
    id: 'monitoring',
    eyebrow: 'Water & Environmental',
    title: 'Real-time quality monitoring',
    body: 'Sensor networks that measure water quality parameters continuously — pH, turbidity, TDS, dissolved oxygen — and alert the right people the moment something goes wrong. Not after the fact. Not manually.',
    details: ['Multi-parameter IoT sensor nodes', 'Instant contamination alerts via SMS + app', 'Regulatory compliance reporting', 'Edge processing for reliability without internet', 'Central dashboard for all nodes'],
    product: 'Pramaan',
    productHref: '/products/pramaan',
    productStatus: 'In Development',
  },
  {
    id: 'software',
    eyebrow: 'Operational Software',
    title: 'Digital workflow infrastructure',
    body: 'We replace paper-based and manually-operated workflows with reliable digital systems — subscription platforms, operational dashboards, record management, and customer-facing portals that actually get used.',
    details: ['QR-based transaction systems', 'Subscription and billing management', 'Real-time operational dashboards', 'Customer self-service portals', 'Audit-ready transaction logs'],
    product: 'Thalii',
    productHref: '/products/thalii',
    productStatus: 'Live',
  },
  {
    id: 'automation',
    eyebrow: 'Process Automation',
    title: 'Replace manual processes',
    body: 'Most operational inefficiency comes from manually-maintained records, manual notifications, and manual reconciliation. We identify these steps and automate them in a way that the team actually adopts.',
    details: ['Automated subscription renewal flows', 'Alert escalation pipelines', 'Data reconciliation and reporting', 'Workflow-triggered communications', 'Exception handling systems'],
    product: null,
    productHref: null,
    productStatus: null,
  },
  {
    id: 'iot',
    eyebrow: 'IoT & Edge Computing',
    title: 'Sensor systems that work in the field',
    body: 'There\'s a large gap between an IoT prototype and a production-grade sensor system. We design and build sensor networks that account for connectivity failure, power variance, and physical installation constraints.',
    details: ['Custom sensor node design', 'Edge processing for offline operation', 'Secure data transmission and storage', 'Remote node management', 'Field installation protocols'],
    product: null,
    productHref: null,
    productStatus: null,
  },
];

export default function Solutions() {
  return (
    <>
      <Helmet>
        <title>Solutions — IOSON</title>
        <meta name="description" content="IOSON builds water monitoring systems, operational software, automation workflows, and IoT infrastructure for real-world business problems." />
        <meta property="og:title" content="Solutions — IOSON" />
        <meta property="og:description" content="Water quality monitoring, digital infrastructure, process automation, and IoT sensor systems." />
      </Helmet>

      {/* Hero */}
      <section style={{ background: '#FFFFFF', paddingTop: 'clamp(96px,14vw,128px)', paddingBottom: 'clamp(48px,7vw,72px)' }}>
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22,1,0.36,1] }} style={{ maxWidth: 620 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#888', marginBottom: 18 }}>Solution Areas</div>
            <h1 style={{ fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-.04em', lineHeight: 1.04, fontFamily: "'Space Grotesk',sans-serif", margin: '0 0 16px' }}>
              What we build — and why
            </h1>
            <p style={{ fontSize: 'clamp(0.9375rem,1.5vw,1.0625rem)', color: '#404040', lineHeight: 1.78 }}>
              We work across four solution areas, all connected by the same principle: replace a manual, error-prone, or absent system with something reliable, digital, and operationally useful.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions */}
      {solutions.map((s, i) => (
        <section key={s.id} id={s.id} style={{ background: i % 2 === 0 ? '#FAFAFA' : '#FFFFFF', padding: 'clamp(56px,9vw,96px) 0', borderTop: '1px solid rgba(0,0,0,.06)' }}>
          <div className="container-custom">
            <div className="solution-detail-grid">
              <motion.div {...fd(0.05)}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#888', marginBottom: 12 }}>{s.eyebrow}</div>
                <h2 style={{ fontSize: 'clamp(1.5rem,3.5vw,2.5rem)', fontWeight: 700, color: '#0D0D0D', letterSpacing: '-.03em', lineHeight: 1.1, fontFamily: "'Space Grotesk',sans-serif", marginBottom: 16 }}>{s.title}</h2>
                <p style={{ fontSize: 'clamp(0.9375rem,1.4vw,1rem)', color: '#404040', lineHeight: 1.78, marginBottom: 24 }}>{s.body}</p>
                {s.product && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: '#FFFFFF', border: '1px solid rgba(0,0,0,.08)', borderRadius: 10, width: 'fit-content' }}>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#888', marginBottom: 2 }}>Our product</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#0D0D0D' }}>{s.product}</div>
                    </div>
                    <span style={{ marginLeft: 4 }} className={s.productStatus === 'Live' ? 'tag-green' : 'tag-amber'}>{s.productStatus}</span>
                    <Link to={s.productHref!} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: '#2563EB', textDecoration: 'none', marginLeft: 4, transition: 'color .2s' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#1D4ED8'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#2563EB'; }}>
                      View <ArrowRight size={11} aria-hidden="true"/>
                    </Link>
                  </div>
                )}
              </motion.div>

              <motion.div {...fd(0.12)}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#888', marginBottom: 16 }}>Capabilities</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {s.details.map(d => (
                    <div key={d} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px', background: i % 2 === 0 ? '#FFFFFF' : '#FAFAFA', border: '1px solid rgba(0,0,0,.07)', borderRadius: 8 }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#2563EB', display: 'inline-block', flexShrink: 0, marginTop: 6 }} aria-hidden="true"/>
                      <span style={{ fontSize: 13.5, color: '#404040', lineHeight: 1.6 }}>{d}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      <CTABanner/>

      <style>{`
        .solution-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2.5rem,5vw,5rem);
          align-items: flex-start;
        }
        @media (max-width: 768px) {
          .solution-detail-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
