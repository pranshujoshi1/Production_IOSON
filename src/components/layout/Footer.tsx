import { Link } from 'react-router-dom';

const cols = [
  {
    heading: 'Products',
    links: [
      { label: 'Thalii', href: '/products/thalii' },
      { label: 'Pramaan', href: '/products/pramaan' },
      { label: 'All Products', href: '/products' },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'Water Monitoring', href: '/solutions#monitoring' },
      { label: 'Smart Automation', href: '/solutions#automation' },
      { label: 'Digital Infrastructure', href: '/solutions#software' },
      { label: 'IoT & Edge Computing', href: '/solutions#iot' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Insights', href: '/insights' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer aria-label="Site footer" style={{ background: '#0D0D0D', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container-custom">
        <div className="footer-inner">

          {/* Brand column */}
          <div className="footer-brand">
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 800, letterSpacing: '0.22em', color: '#FFFFFF', marginBottom: 14 }}>
              IOSON
            </div>
            <p style={{ fontSize: 13, color: '#444', lineHeight: 1.72, maxWidth: 240, marginBottom: 20 }}>
              Building intelligent software and IoT systems for businesses that run on real operations.
            </p>
            <div style={{ fontSize: 12.5, color: '#444', marginBottom: 4 }}>
              <a href="mailto:contact@iosonx.com" style={{ color: '#666', textDecoration: 'none', transition: 'color .18s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#F5F5F5'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#666'; }}>
                contact@iosonx.com
              </a>
            </div>
            <div style={{ fontSize: 12.5, color: '#444', lineHeight: 1.5 }}>
              Vijay Nagar, Indore<br />Madhya Pradesh, India
            </div>
          </div>

          {/* Link columns */}
          <nav aria-label="Footer navigation" className="footer-cols">
            {cols.map(col => (
              <div key={col.heading}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#444', marginBottom: 16 }}>
                  {col.heading}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.links.map(l => (
                    <Link
                      key={l.label}
                      to={l.href}
                      style={{ fontSize: 13, color: '#666', textDecoration: 'none', transition: 'color .16s' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#F5F5F5'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#666'; }}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: 20, paddingBottom: 36,
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem',
        }}>
          <span style={{ fontSize: 12, color: '#444' }}>
            &copy; {year} IOSON. All rights reserved.
          </span>
        </div>
      </div>

      <style>{`
        .footer-inner {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 4rem;
          align-items: flex-start;
          padding-top: 60px;
          padding-bottom: 44px;
        }
        .footer-cols {
          display: grid;
          grid-template-columns: repeat(4, auto);
          gap: 3rem;
        }
        @media (max-width: 1024px) { .footer-cols { gap: 2rem; } }
        @media (max-width: 768px) {
          .footer-inner {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            padding-top: 44px;
            padding-bottom: 28px;
          }
          .footer-cols { grid-template-columns: repeat(2, 1fr); gap: 2rem 1.5rem; }
        }
        @media (max-width: 400px) {
          .footer-cols { grid-template-columns: 1fr; gap: 1.75rem; }
        }
      `}</style>
    </footer>
  );
}
