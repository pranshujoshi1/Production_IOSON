import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';

const categories = ['All', 'IoT', 'Automation', 'Product', 'Engineering', 'Industry'];

const articles = [
  { slug:'iot-water-quality-monitoring',   category:'IoT',         title:'How IoT is Revolutionizing Water Quality Monitoring in India',        excerpt:'Real-time contamination detection networks are transforming how municipalities manage water safety.',          readTime:'6 min', date:'May 2025'      },
  { slug:'qr-meal-subscription-future',    category:'Product',     title:'The Future of Canteen Management: Beyond Paper and Counting',          excerpt:'Why QR-based subscription systems are replacing manual tracking in corporate cafeterias.',                   readTime:'4 min', date:'April 2025'    },
  { slug:'automation-production',          category:'Automation',  title:"Designing Automation Systems That Don't Break When Reality Hits",       excerpt:"The gap between automation demos and production deployments is where most projects fail.",                   readTime:'8 min', date:'March 2025'   },
  { slug:'edge-computing-iot',             category:'Engineering', title:'Why Edge Computing Changes Everything for IoT Deployments',            excerpt:"Processing data at the device layer isn't just faster — it's fundamentally more reliable.",                  readTime:'7 min', date:'February 2025'},
  { slug:'smart-monitoring-healthcare',    category:'Industry',    title:'Smart Environmental Monitoring in Healthcare: A Case for Precision',   excerpt:'Hospitals face strict environmental requirements. IoT monitoring is the new standard.',                      readTime:'5 min', date:'January 2025' },
  { slug:'building-reliable-iot-firmware', category:'Engineering', title:'Writing Firmware That Survives the Real World',                        excerpt:'Embedded systems in field deployments face challenges that lab testing never reveals.',                       readTime:'10 min',date:'December 2024'},
];

export default function Insights() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? articles : articles.filter(a => a.category === active);

  return (
    <>
      <Helmet>
        <title>Insights — IOSON</title>
        <meta name="description" content="Engineering articles on IoT, automation, and intelligent systems from IOSON." />
      </Helmet>

      {/* Hero */}
      <section style={{ background: '#F5F5F5', paddingTop: 'clamp(96px,14vw,128px)', paddingBottom: 'clamp(48px,7vw,80px)' }}>
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ maxWidth: 560 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8C8C8C', marginBottom: 16 }}>Thinking Aloud</div>
            <h1 style={{ fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-.04em', lineHeight: 1.04, fontFamily: "'Space Grotesk',sans-serif", margin: '0 0 16px' }}>Engineering Insights</h1>
            <p style={{ fontSize: 'clamp(0.9375rem,1.5vw,1.0625rem)', color: '#4B4B4B', lineHeight: 1.75, margin: 0 }}>Articles on IoT, automation, product engineering, and decisions we make building intelligent systems.</p>
          </motion.div>
        </div>
      </section>

      {/* Articles */}
      <section style={{ background: '#F5F5F5', padding: '0 0 clamp(64px,9vw,100px)' }}>
        <div className="container-custom">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)} aria-pressed={active === cat}
                style={{ padding: '8px 16px', borderRadius: 100, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, transition: 'all .2s', minHeight: 36, background: active === cat ? '#0D0D0D' : 'rgba(0,0,0,.05)', color: active === cat ? '#F5F5F5' : '#4B4B4B' }}>
                {cat}
              </button>
            ))}
          </motion.div>

          <div className="insights-page-grid">
            {filtered.map((a, i) => (
              <motion.div key={a.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <Link to={`/insights/${a.slug}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div className="insights-page-card"
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#EFEFEF'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = '#F5F5F5'; }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                      <span style={{ padding: '3px 10px', borderRadius: 100, background: 'rgba(0,0,0,.05)', border: '1px solid rgba(0,0,0,.08)', fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#4B4B4B' }}>{a.category}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#8C8C8C' }}><Clock size={10} aria-hidden="true"/> {a.readTime}</span>
                    </div>
                    <h2 style={{ fontSize: 15, fontWeight: 600, color: '#0D0D0D', lineHeight: 1.5, marginBottom: 10, flex: 1, letterSpacing: '-.01em' }}>{a.title}</h2>
                    <p style={{ fontSize: 13, color: '#4B4B4B', lineHeight: 1.7, marginBottom: 20, flex: 1 }}>{a.excerpt}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid rgba(0,0,0,.07)', marginTop: 'auto' }}>
                      <span style={{ fontSize: 11, color: '#8C8C8C' }}>{a.date}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: '#4B4B4B' }}>Read <ArrowRight size={10} aria-hidden="true"/></span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div style={{ gridColumn: '1/-1', background: '#F5F5F5', padding: 'clamp(48px,8vw,80px) 32px', textAlign: 'center', fontSize: 14, color: '#8C8C8C' }}>No articles in this category yet.</div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .insights-page-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(0,0,0,.07);
        }
        .insights-page-card {
          background: #F5F5F5;
          padding: clamp(24px,3.5vw,36px) clamp(20px,3vw,32px);
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: background .2s;
        }
        @media (max-width: 900px) { .insights-page-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 560px) { .insights-page-grid { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
