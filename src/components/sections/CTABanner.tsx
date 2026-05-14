import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function CTABanner() {
  return (
    <section aria-label="Get started with IOSON" style={{ background: '#0D0D0D', padding: 'clamp(72px,10vw,120px) 0' }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}
        >
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#444', marginBottom: 20 }}>
            Ready to begin
          </div>

          <h2 style={{
            fontSize: 'clamp(1.75rem,5vw,3.75rem)',
            fontWeight: 800, color: '#FFFFFF',
            letterSpacing: '-.04em', lineHeight: 1.05,
            fontFamily: "'Space Grotesk', sans-serif", marginBottom: 18,
          }}>
            Have a problem worth engineering?
          </h2>

          <p style={{
            fontSize: 'clamp(0.9375rem,1.4vw,1.0625rem)',
            color: '#666', lineHeight: 1.72,
            marginBottom: 40, maxWidth: 420, marginLeft: 'auto', marginRight: 'auto',
          }}>
            Tell us what you're dealing with — a manual process, a monitoring gap, a system that doesn't exist yet. We'll tell you honestly whether we can help.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '0.875rem' }}>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 26px', borderRadius: 7,
                background: '#FFFFFF', color: '#0D0D0D',
                fontSize: 14, fontWeight: 700, textDecoration: 'none',
                transition: 'background .18s, transform .15s',
                whiteSpace: 'nowrap',
                minHeight: 44,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F5F5F5'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.transform = 'translateY(0)'; }}
              aria-label="Contact IOSON to start a conversation"
            >
              Start a conversation <ArrowRight size={14} aria-hidden="true"/>
            </Link>
            <Link
              to="/products"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 24px', borderRadius: 7,
                border: '1px solid rgba(255,255,255,0.12)', color: '#888',
                fontSize: 14, fontWeight: 600, textDecoration: 'none',
                transition: 'border-color .2s, color .2s',
                whiteSpace: 'nowrap',
                minHeight: 44,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#F5F5F5'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#888'; }}
            >
              View our products
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
