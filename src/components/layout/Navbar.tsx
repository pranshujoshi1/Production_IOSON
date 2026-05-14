import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Products',  href: '/products'  },
  { label: 'Solutions', href: '/solutions' },
  { label: 'About',     href: '/about'     },
  { label: 'Contact',   href: '/contact'   },
];

/* ─────────────────────────────────────────────────────── */
export function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [overDark,   setOverDark]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const rafRef   = useRef<number | null>(null);

  /* ── Scroll: pill shrink + dark-background detection ── */
  useEffect(() => {
    /**
     * Sample the pixel under the center of the navbar.
     * Walk up the DOM until we find a real (non-transparent) background,
     * then compute its luminance. If luminance < 0.35 → dark section.
     */
    const isDarkUnderNav = (): boolean => {
      const NAV_MID_Y = 44; // roughly center of the navbar pill
      const midX      = window.innerWidth / 2;
      const el        = document.elementFromPoint(midX, NAV_MID_Y);

      let node: Element | null = el;
      while (node && node !== document.documentElement) {
        const bg = getComputedStyle(node).backgroundColor;
        // Skip transparent / none
        if (!bg || bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') {
          node = node.parentElement;
          continue;
        }
        const nums = bg.match(/[\d.]+/g);
        if (nums && nums.length >= 3) {
          const r = parseFloat(nums[0]);
          const g = parseFloat(nums[1]);
          const b = parseFloat(nums[2]);
          // Relative luminance (perceived brightness 0–1)
          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          return lum < 0.35;
        }
        node = node.parentElement;
      }
      return false;
    };

    const tick = () => {
      setScrolled(window.scrollY > 60);
      setOverDark(isDarkUnderNav());
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        tick();
      });
    };

    tick(); // run immediately on mount / route change
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [location]);


  /* ── Close mobile menu on route change ── */
  useEffect(() => { setMobileOpen(false); }, [location]);

  /* ── Body scroll lock when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* ── Derived colour tokens (all with 0.35 s CSS transitions) ── */
  const T = {
    logo:      overDark ? '#FFFFFF'                  : '#0D0D0D',
    link:      overDark ? 'rgba(255,255,255,0.70)'   : '#555555',
    linkActive:overDark ? '#FFFFFF'                  : '#0D0D0D',
    underline: overDark ? '#FFFFFF'                  : '#0D0D0D',
    activeBg:  overDark ? 'rgba(255,255,255,0.12)'   : 'rgba(0,0,0,0.06)',
    hoverBg:   overDark ? 'rgba(255,255,255,0.10)'   : 'rgba(0,0,0,0.045)',
    hoverText: overDark ? '#FFFFFF'                  : '#0D0D0D',
    ctaBg:     overDark ? '#FFFFFF'                  : '#0D0D0D',
    ctaText:   overDark ? '#0D0D0D'                  : '#FFFFFF',
    icon:      overDark ? '#FFFFFF'                  : '#0D0D0D',
    trans:     'color 0.35s ease, background 0.35s ease, border-color 0.35s ease, opacity 0.35s ease',
  };

  return (
    <>
      {/* ── Outer wrapper — fixed, full-width ── */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 200,
          padding: scrolled ? '10px 0' : '0',
          display: 'flex',
          justifyContent: 'center',
          transition: 'padding 0.45s cubic-bezier(0.4,0,0.2,1)',
          pointerEvents: 'none',
        }}
      >
        {/* ── Inner pill / bar ── */}
        <div
          style={{
            pointerEvents: 'auto',
            width:        scrolled ? 'clamp(520px, 58%, 860px)' : '100%',
            height:       scrolled ? 52 : 'var(--nav-h)',
            display:      'flex',
            alignItems:   'center',
            borderRadius: scrolled ? 100 : 0,
            background:   scrolled ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.05)',
            backdropFilter:       scrolled ? 'blur(24px) saturate(180%)' : 'blur(8px)',
            WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(200%)' : 'blur(8px)',
            border:    scrolled ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.05)',
            boxShadow: scrolled ? '0 8px 30px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.7) inset' : 'none',
            transition: [
              'width 0.45s cubic-bezier(0.4,0,0.2,1)',
              'height 0.4s cubic-bezier(0.4,0,0.2,1)',
              'border-radius 0.45s cubic-bezier(0.4,0,0.2,1)',
              'background 0.35s ease',
              'border-color 0.35s ease',
              'box-shadow 0.35s ease',
            ].join(', '),
            overflow: 'hidden',
          }}
        >
          <div style={{
            width: '100%',
            maxWidth: scrolled ? 'none' : 1320,
            margin: '0 auto',
            padding: scrolled ? '0 clamp(16px,3vw,32px)' : '0 clamp(20px,5vw,64px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            transition: 'padding 0.4s cubic-bezier(0.4,0,0.2,1)',
          }}>

            {/* ── Wordmark ── */}
            <Link
              to="/"
              aria-label="IOSON — go to homepage"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize:   scrolled ? 13.5 : 15,
                fontWeight: 800,
                letterSpacing: '0.22em',
                color:      T.logo,
                textDecoration: 'none',
                flexShrink: 0,
                lineHeight: 1,
                transition: `font-size 0.35s, ${T.trans}`,
              }}
            >
              IOSON
            </Link>

            {/* ── Center nav (desktop) ── */}
            <nav
              aria-label="Main navigation"
              className="desktop-nav"
              style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, justifyContent: 'center' }}
            >
              {navLinks.map(link => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  style={({ isActive }) => ({
                    position:   'relative',
                    padding:    scrolled ? '5px 11px' : '6px 13px',
                    borderRadius: 100,
                    fontSize:   scrolled ? 13 : 13.5,
                    fontWeight: isActive ? 600 : 450,
                    color:      isActive ? T.linkActive : T.link,
                    textDecoration: 'none',
                    letterSpacing: '-0.01em',
                    transition: `${T.trans}, padding 0.35s, font-size 0.35s`,
                    whiteSpace: 'nowrap',
                  })}
                  className={({ isActive }) => cn(isActive ? 'nav-link-active' : 'nav-link')}
                >
                  {({ isActive }) => (
                    <>
                      {link.label}

                      {/* Active underline (un-scrolled state) */}
                      {isActive && !scrolled && (
                        <span style={{
                          position: 'absolute',
                          bottom: -1, left: 13, right: 13,
                          height: 2,
                          background: T.underline,
                          borderRadius: 2,
                          transition: T.trans,
                        }} />
                      )}

                      {/* Active pill bg (scrolled state) */}
                      {isActive && scrolled && (
                        <span style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: 100,
                          background: T.activeBg,
                          zIndex: -1,
                          transition: T.trans,
                        }} />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* ── CTA button (desktop) ── */}
            <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <Link
                to="/products"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding:    scrolled ? '6px 14px' : '7px 16px',
                  borderRadius: 100,
                  background: T.ctaBg,
                  color:      T.ctaText,
                  fontSize:   scrolled ? 12.5 : 13,
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  textDecoration: 'none',
                  transition: `${T.trans}, padding 0.35s, font-size 0.35s, transform 0.15s`,
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.opacity = '0.88'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.opacity = '1'; }}
              >
                Our Products
              </Link>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="mobile-toggle"
              style={{
                background: 'none', border: 'none',
                cursor: 'pointer', padding: 8,
                color:   T.icon,
                display: 'none',
                alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, borderRadius: 100,
                transition: T.trans,
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen
                  ? <motion.span key="x"   initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90,  opacity: 0 }} transition={{ duration: 0.16 }}><X    size={20}/></motion.span>
                  : <motion.span key="ham" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.16 }}><Menu size={20}/></motion.span>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Mobile full-screen overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 199,
              background: '#0D0D0D',
              display: 'flex', flexDirection: 'column',
              padding: '88px 28px 48px',
            }}
          >
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13, fontWeight: 800,
              letterSpacing: '0.22em', color: 'rgba(255,255,255,0.3)',
              marginBottom: 44,
            }}>
              IOSON
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.055 + 0.04, duration: 0.28 }}
                >
                  <NavLink to={link.href} style={{ textDecoration: 'none' }}>
                    {({ isActive }) => (
                      <span style={{
                        display: 'block',
                        fontSize: 'clamp(2rem,9vw,3rem)',
                        fontWeight: 700,
                        letterSpacing: '-0.03em',
                        color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.35)',
                        padding: '8px 0',
                        fontFamily: "'Space Grotesk', sans-serif",
                        lineHeight: 1.1,
                        transition: 'color 0.16s',
                      }}>
                        {link.label}
                      </span>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
            >
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>contact@iosonx.com</div>
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '13px 22px', borderRadius: 100,
                    background: '#FFFFFF', color: '#0D0D0D',
                    fontSize: 14, fontWeight: 700, textDecoration: 'none',
                    width: 'fit-content',
                  }}
                >
                  Get in touch <ArrowRight size={14}/>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1023px) {
          .desktop-nav   { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
        @media (min-width: 1024px) {
          .mobile-toggle { display: none !important; }
          .desktop-nav   { display: flex !important; }
        }
        .nav-link:hover {
          color: ${T.hoverText} !important;
          background: ${T.hoverBg};
          border-radius: 100px;
        }
      `}</style>
    </>
  );
}
