import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, QrCode, Users, BarChart3, Layers, Smartphone, Shield, CheckCircle } from 'lucide-react';
import { CTABanner } from '@/components/sections/CTABanner';

const fd = (d = 0) => ({ initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-50px' }, transition: { delay: d, duration: 0.55, ease: [0.22,1,0.36,1] as const } });

const features = [
  { Icon: QrCode,     title: 'QR meal verification',         desc: 'One scan confirms the subscription, deducts the meal, and updates the balance. No manual registers. No counting. No disputes.' },
  { Icon: Users,      title: 'Subscription management',       desc: 'Full customer profiles with subscription history, balance, and redemption patterns. Know who\'s active, who\'s expired, who\'s due.' },
  { Icon: BarChart3,  title: 'Daily operational dashboard',   desc: 'Meals served, revenue, peak hours, and low-balance alerts — all visible in real time from any device.' },
  { Icon: Layers,     title: 'Kitchen and counter workflow',  desc: 'Staff see the live queue. Prepare the right number of meals for the day, reduce waste, improve peak-hour service.' },
  { Icon: Smartphone, title: 'Customer self-service portal',  desc: 'Customers can check balance, top up, and view their history on their phone — reducing counter queries.' },
  { Icon: Shield,     title: 'Secure payments and audit log', desc: 'Every transaction is logged and timestamped. Disputes are resolved in seconds with a verifiable audit trail.' },
];

const workflow = [
  { n: '01', title: 'Customer subscribes once',     body: 'Customer selects a meal plan, pays digitally, and receives their QR code instantly. Under two minutes, start to finish.' },
  { n: '02', title: 'Daily QR scan at counter',     body: 'Staff scan the QR. System validates, marks meal redeemed, updates balance. The whole process takes under two seconds.' },
  { n: '03', title: 'You see everything live',       body: 'Today\'s meal count, revenue, active subscribers, and alerts — visible in real time on your dashboard.' },
  { n: '04', title: 'Renewals handled automatically', body: 'The system sends reminders before subscriptions expire and flags lapsed customers. No chasing, no manual lists.' },
];

const useCases = [
  'Bhojnalayas and traditional thali restaurants',
  'Corporate office cafeterias',
  'College and university canteens',
  'Hospital and healthcare food services',
  'Industrial plant and factory mess halls',
  'Co-working spaces with meal programs',
];

const results = [
  ['0',     'Paper registers still needed'],
  ['< 2s',  'Average QR scan time'],
  ['80%',   'Reduction in manual tracking'],
  ['100%',  'Payments tracked digitally'],
];

export default function Thalii() {
  return (
    <>
      <Helmet>
        <title>Thalii — QR Meal Subscription Platform | IOSON</title>
        <meta name="description" content="Thalii replaces paper registers and manual counting for bhojnalayas and canteens with a QR-based digital subscription and redemption system." />
      </Helmet>

      <section style={{ background: '#FFFFFF', paddingTop: 'clamp(96px,14vw,128px)', paddingBottom: 'clamp(48px,7vw,80px)' }}>
        <div className="container-custom">
          <div className="thalii-hero-grid">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22,1,0.36,1] as const }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 22, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ padding: '3px 11px', borderRadius: 100, background: 'rgba(37,99,235,.07)', border: '1px solid rgba(37,99,235,.2)', fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#2563EB' }}>Meal Subscription Platform</span>
                <span className="tag-green">Live</span>
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem,6vw,5.5rem)', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-.045em', lineHeight: 1, fontFamily: "'Space Grotesk',sans-serif", margin: '0 0 14px' }}>Thalii</h1>
              <p style={{ fontSize: 'clamp(1rem,1.8vw,1.15rem)', fontWeight: 600, color: '#2563EB', marginBottom: 16 }}>QR-Based Meal Subscriptions for Canteens and Bhojnalayas</p>
              <p style={{ fontSize: 'clamp(0.875rem,1.4vw,1rem)', color: '#404040', lineHeight: 1.78, marginBottom: 28, maxWidth: 480 }}>
                Most canteens still track monthly subscribers in paper registers — and lose money to missed payments, miscounted meals, and disputes. Thalii fixes that with a simple QR scan at the counter.
              </p>
              <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn-primary">Request a Demo <ArrowRight size={13} aria-hidden="true"/></Link>
                <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '11px 18px', borderRadius: 7, border: '1px solid rgba(0,0,0,.1)', color: '#666', fontSize: 13, fontWeight: 600, textDecoration: 'none', transition: 'border-color .2s,color .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,.22)'; e.currentTarget.style.color = '#0D0D0D'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,.1)'; e.currentTarget.style.color = '#666'; }}>
                  <ArrowLeft size={12} aria-hidden="true"/> All Products
                </Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.22, duration: 0.85, ease: [0.22,1,0.36,1] as const }} className="thalii-visual">
              <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,.08)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,.08)', maxWidth: 340 }}>
                <div style={{ padding: '11px 16px', background: '#FAFAFA', borderBottom: '1px solid rgba(0,0,0,.05)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <QrCode size={12} style={{ color: '#2563EB' }} aria-hidden="true"/>
                  <span style={{ fontSize: 10.5, fontWeight: 600, color: '#404040' }}>Thalii — Live Session</span>
                  <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span className="green-dot" aria-hidden="true"/>
                    <span style={{ fontSize: 10, color: '#16A34A', fontWeight: 600 }}>Live</span>
                  </span>
                </div>
                <div style={{ padding: '18px' }}>
                  <div style={{ textAlign: 'center', marginBottom: 16 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#888', marginBottom: 4 }}>Today's Activity</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#0D0D0D', letterSpacing: '-.03em', fontFamily: "'Space Grotesk',sans-serif" }}>84 meals served</div>
                    <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>247 active subscribers</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(0,0,0,.06)', borderRadius: 8, overflow: 'hidden', marginBottom: 14 }}>
                    {[['₹18K','Revenue'],['12','Renewals'],['3','Low bal']].map(([v,l]) => (
                      <div key={l} style={{ background: '#fff', padding: '9px 4px', textAlign: 'center' }}>
                        <div style={{ fontSize: 12, fontWeight: 800, color: '#0D0D0D', fontFamily: "'Space Grotesk',sans-serif" }}>{v}</div>
                        <div style={{ fontSize: 9, color: '#888', marginTop: 1 }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: 'rgba(22,163,74,.07)', border: '1px solid rgba(22,163,74,.18)', borderRadius: 8, padding: '9px 12px' }}>
                    <span style={{ fontSize: 11, color: '#15803D', fontWeight: 500 }}>✓ Last scan: 2 mins ago — Meal redeemed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section style={{ background: '#FAFAFA', padding: 'clamp(48px,7vw,72px) 0', borderTop: '1px solid rgba(0,0,0,.06)' }}>
        <div className="container-custom">
          <motion.div {...fd()} style={{ maxWidth: 660, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#888', marginBottom: 12 }}>The Problem We Solve</div>
            <h2 style={{ fontSize: 'clamp(1.375rem,3vw,2.25rem)', fontWeight: 700, color: '#0D0D0D', letterSpacing: '-.03em', lineHeight: 1.15, fontFamily: "'Space Grotesk',sans-serif", marginBottom: 14 }}>Paper registers don't scale. And they cause real losses.</h2>
            <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.76 }}>Disputes over payment status. Staff miscounting. Customers claiming balance they don't have. A missed renewal that nobody caught. Thalii eliminates each of these — every transaction is digital, timestamped, and verifiable.</p>
          </motion.div>
        </div>
      </section>

      <section style={{ background: '#FFFFFF', padding: 'clamp(56px,9vw,96px) 0', borderTop: '1px solid rgba(0,0,0,.06)' }}>
        <div className="container-custom">
          <motion.div {...fd()} style={{ marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#888', marginBottom: 12 }}>Features</div>
            <h2 style={{ fontSize: 'clamp(1.5rem,3.5vw,2.5rem)', fontWeight: 700, color: '#0D0D0D', letterSpacing: '-.03em', lineHeight: 1.1, fontFamily: "'Space Grotesk',sans-serif", margin: 0 }}>Everything the operation needs.</h2>
          </motion.div>
          <div className="thalii-features">
            {features.map(({ Icon, title, desc }, i) => (
              <motion.div key={title} {...fd(i * 0.07)}>
                <div style={{ padding: 'clamp(20px,3vw,28px)', borderTop: '1px solid rgba(0,0,0,.07)', height: '100%' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(37,99,235,.07)', border: '1px solid rgba(37,99,235,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, color: '#2563EB' }}><Icon size={15} aria-hidden="true"/></div>
                  <h3 style={{ fontSize: 13.5, fontWeight: 700, color: '#0D0D0D', marginBottom: 7, fontFamily: "'Space Grotesk',sans-serif" }}>{title}</h3>
                  <p style={{ fontSize: 13, color: '#404040', lineHeight: 1.74, margin: 0 }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#FAFAFA', padding: 'clamp(56px,9vw,96px) 0', borderTop: '1px solid rgba(0,0,0,.06)' }}>
        <div className="container-custom">
          <motion.div {...fd()} style={{ marginBottom: 'clamp(2rem,4vw,3.5rem)' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#888', marginBottom: 12 }}>How It Works</div>
            <h2 style={{ fontSize: 'clamp(1.5rem,3.5vw,2.5rem)', fontWeight: 700, color: '#0D0D0D', letterSpacing: '-.03em', lineHeight: 1.1, fontFamily: "'Space Grotesk',sans-serif", margin: 0 }}>Simple for staff. Seamless for customers.</h2>
          </motion.div>
          <div className="thalii-workflow">
            {workflow.map((w, i) => (
              <motion.div key={w.n} {...fd(i * 0.08)} style={{ padding: 'clamp(20px,3vw,30px)', borderTop: '1px solid rgba(0,0,0,.07)' }}>
                <div style={{ fontSize: 'clamp(2rem,4vw,2.75rem)', fontWeight: 800, color: 'rgba(0,0,0,.07)', letterSpacing: '-.06em', lineHeight: 1, marginBottom: 14, fontFamily: "'Space Grotesk',sans-serif" }}>{w.n}</div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0D0D0D', marginBottom: 8, fontFamily: "'Space Grotesk',sans-serif" }}>{w.title}</h3>
                <p style={{ fontSize: 13, color: '#404040', lineHeight: 1.74, margin: 0 }}>{w.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#FFFFFF', padding: 'clamp(56px,9vw,96px) 0', borderTop: '1px solid rgba(0,0,0,.06)' }}>
        <div className="container-custom">
          <div className="thalii-bottom">
            <motion.div {...fd(0.05)}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#888', marginBottom: 16 }}>Who It's For</div>
              <h2 style={{ fontSize: 'clamp(1.375rem,2.5vw,2rem)', fontWeight: 700, color: '#0D0D0D', letterSpacing: '-.03em', lineHeight: 1.15, fontFamily: "'Space Grotesk',sans-serif", marginBottom: 20 }}>Any business that serves daily meals on subscription</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {useCases.map(uc => (
                  <div key={uc} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#404040' }}>
                    <CheckCircle size={13} style={{ color: '#16A34A', flexShrink: 0 }} aria-hidden="true"/> {uc}
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-primary">Talk to us about Thalii <ArrowRight size={13} aria-hidden="true"/></Link>
            </motion.div>
            <motion.div {...fd(0.12)}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#888', marginBottom: 16 }}>What Changes</div>
              {results.map(([val, label]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 20, padding: '16px 0', borderBottom: '1px solid rgba(0,0,0,.07)' }}>
                  <div style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: 800, color: '#0D0D0D', fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '-.04em', flexShrink: 0, minWidth: 72, lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: 13, color: '#404040', lineHeight: 1.6, paddingTop: 4 }}>{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <CTABanner/>

      <style>{`
        .thalii-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2.5rem,5vw,5rem); align-items: center; }
        .thalii-features   { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: rgba(0,0,0,.07); }
        .thalii-workflow   { display: grid; grid-template-columns: repeat(4,1fr); gap: 1px; background: rgba(0,0,0,.07); }
        .thalii-bottom     { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2.5rem,5vw,5rem); align-items: flex-start; }
        @media (max-width: 1024px) { .thalii-workflow { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 900px) { .thalii-features { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 768px) { .thalii-hero-grid { grid-template-columns: 1fr; } .thalii-visual { display: none !important; } .thalii-bottom { grid-template-columns: 1fr; } }
        @media (max-width: 560px) { .thalii-features { grid-template-columns: 1fr; } .thalii-workflow { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
