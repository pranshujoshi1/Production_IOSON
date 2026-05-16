import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { CTABanner } from '@/components/sections/CTABanner';
import { Building2, Users, Zap, Shield, Target, Award } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as unknown as Easing;
const fd = (d = 0) => ({ initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-40px' }, transition: { delay: d, duration: 0.52, ease: EASE } });

const timeline = [
  {
    year: 'March 2026',
    title: 'Founded',
    body: 'IOSON started with a clear observation: most operational problems in businesses — canteens, water networks, factory workflows — were caused by manual processes that no one had bothered to digitise properly. We decided to start fixing them.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop' // Team brainstorming
  },
  {
    year: 'April 2026',
    title: 'Thalii ships',
    body: 'Thalii v1.0 launched as a QR-based meal subscription system for food-service businesses. The core insight: paper registers and coupon books were creating daily disputes that no one could resolve. Digital tracking fixed this immediately.',
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&h=600&fit=crop' // QR code scanning
  },
  {
    year: 'April 2026',
    title: 'Expanding',
    body: 'Thalii enters more deployments. Pramaan approaches field-ready status. The engineering team grows and the product roadmap expands into more operational domains.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop' // Team collaboration
  },
  {
    year: 'May 2026',
    title: 'Pramaan begins',
    body: 'We started development on Pramaan — a sensor-driven water quality monitoring system for real-time contamination detection. Currently in active development with field prototype testing underway.',
    image: 'https://images.unsplash.com/photo-1581093458791-9d42e1b6b8e2?w=800&h=600&fit=crop' // Water testing equipment
  },
];

const principles = [
  {
    n: '01',
    icon: Shield,
    h: 'Production-grade, not demo-grade',
    b: 'A system that works in the demo room often fails in the field. We build for real conditions — connectivity gaps, power fluctuations, and users who don\'t read instructions.',
    color: '#2563EB'
  },
  {
    n: '02',
    icon: Target,
    h: 'Honest engineering timelines',
    b: 'We don\'t overpromise delivery dates to win contracts. We\'d rather tell you something takes longer and ship something that actually works.',
    color: '#7C3AED'
  },
  {
    n: '03',
    icon: Building2,
    h: 'Systems that last',
    b: 'Every product is designed to be maintained, extended, and understood — by the team that builds it and the people who come after.',
    color: '#059669'
  },
  {
    n: '04',
    icon: Zap,
    h: 'Real-world validation',
    b: 'We test in real environments, not just test labs. The gap between a controlled environment and actual operation is exactly where most software fails.',
    color: '#DC2626'
  },
  {
    n: '05',
    icon: Users,
    h: 'Clarity over complexity',
    b: 'If you can\'t explain how the system works to a non-technical operator in five minutes, it\'s too complex. Simplicity is a design constraint, not an afterthought.',
    color: '#EA580C'
  },
  {
    n: '06',
    icon: Award,
    h: 'No black boxes',
    b: 'Every system we build is explainable, auditable, and transparent. If something goes wrong, you\'ll know exactly why and exactly what to do.',
    color: '#0891B2'
  },
];

const stats = [
  { value: '2+', label: 'Active Products', sublabel: 'In Production' },
  { value: '100%', label: 'Uptime Focus', sublabel: 'Field Reliability' },
  { value: '24/7', label: 'System Monitoring', sublabel: 'Real-time Alerts' },
  { value: '5+', label: 'Industries Served', sublabel: 'And Growing' },
];

// const team = [
//   {
//     name: 'Ayush Agrawal',
//     role: 'Co-Founder & CEO',
//     image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
//     bio: 'Systems architect with focus on IoT infrastructure'
//   },
//   {
//     name: 'Engineering Team',
//     role: 'Core Development',
//     image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop',
//     bio: 'Building reliable systems for real-world operations'
//   },
// ];
const clients = [
  {
    name: "Khushi Ki Thali",
    logo: "/logos/kkt-logo.png",
  },
  {
    name: "sethji",
    logo: "/logos/sethji-logo.jpeg",
  },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About — IOSON</title>
        <meta name="description" content="IOSON is a small engineering team building practical IoT and software systems for real operational problems. Founded to replace manual processes with reliable digital infrastructure." />
        <meta property="og:title" content="About IOSON — Intelligent Systems Engineering" />
        <meta property="og:description" content="A focused engineering team building practical technology for real operational problems." />
      </Helmet>

      {/* Hero */}
      <section style={{ background: '#FFFFFF', paddingTop: 'clamp(96px,14vw,128px)', paddingBottom: 'clamp(48px,7vw,80px)' }}>
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }} style={{ maxWidth: 660 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#888', marginBottom: 18 }}>About IOSON</div>
            <h1 style={{ fontSize: 'clamp(2rem,5vw,4.25rem)', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-.04em', lineHeight: 1.04, fontFamily: "'Space Grotesk',sans-serif", margin: '0 0 18px' }}>
              We engineer systems that actually work.
            </h1>
            <p style={{ fontSize: 'clamp(0.9375rem,1.5vw,1.0625rem)', color: '#404040', lineHeight: 1.78, maxWidth: 520 }}>
              IOSON is a small, focused engineering team. We build IoT monitoring systems and operational software for businesses dealing with real, practical problems — not theoretical ones.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: 'clamp(16px,2.5vw,24px)',
              maxWidth: 660,
              marginTop: 40
            }}
          >
            {stats.map((stat, i) => (
              <div key={i} style={{
                textAlign: 'left',
                padding: '18px 0',
                borderTop: '2px solid #2563EB'
              }}>
                <div style={{
                  fontSize: 'clamp(1.5rem,2.5vw,1.875rem)',
                  fontWeight: 800,
                  color: '#0D0D0D',
                  fontFamily: "'Space Grotesk',sans-serif",
                  marginBottom: 6
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#404040', marginBottom: 2 }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: 11, color: '#888' }}>
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Origin with Image */}
      <section style={{ background: '#FAFAFA', padding: 'clamp(56px,9vw,96px) 0', borderTop: '1px solid rgba(0,0,0,.06)' }}>
        <div className="container-custom">
          <div className="about-origin-grid">
            <motion.div {...fd(0.05)} style={{ order: 1 }}>
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop"
                alt="Engineering team working on systems"
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: 400,
                  objectFit: 'cover',
                  borderRadius: 12,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
                }}
              />
            </motion.div>

            <motion.div {...fd(0.12)} style={{ order: 2 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#888', marginBottom: 16 }}>
                Why We Exist
              </div>
              <h2 style={{
                fontSize: 'clamp(1.5rem,3.5vw,2.625rem)',
                fontWeight: 700,
                color: '#0D0D0D',
                letterSpacing: '-.03em',
                lineHeight: 1.1,
                fontFamily: "'Space Grotesk',sans-serif",
                margin: '0 0 20px'
              }}>
                Most operational problems are unsolved not because solutions don't exist — but because no one built the right one.
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  'We started IOSON with a simple belief — technology should solve real operational problems, not complicate them. Across industries, we saw businesses struggling with disconnected workflows, manual processes, and systems that were either too expensive, too complex, or simply not built for how people actually work.',
                  'IOSON was created to build practical digital systems that are reliable, scalable, and easy to use in real-world environments. We focus on creating solutions that improve operational visibility, reduce repetitive work, and help businesses move toward smarter and more efficient processes.',
                  'Our approach is simple: understand the problem deeply, design with practicality in mind, and build technology that delivers measurable value in everyday operations.',
                ].map((p, i) => (
                  <p key={i} style={{
                    fontSize: 'clamp(0.875rem,1.4vw,0.9375rem)',
                    color: '#404040',
                    lineHeight: 1.8,
                    margin: 0
                  }}>
                    {p}
                  </p>
                ))}
              </div>

              {/* Trust Badges */}
              <div style={{
                marginTop: 28,
                padding: '20px 22px',
                background: '#FFFFFF',
                borderRadius: 8,
                border: '1px solid rgba(0,0,0,.08)'
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#888', marginBottom: 14, letterSpacing: '.1em', textTransform: 'uppercase' }}>
                  Trusted by organizations in
                </div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px 16px',
                  fontSize: 12.5,
                  color: '#404040',
                  fontWeight: 500
                }}>
                  <span>🏢 Corporate Canteens</span>
                  <span>🏭 Manufacturing</span>
                  <span>🏫 Educational Institutions</span>
                  <span>💧 Water Management</span>
                  <span>🍽️ Food Services</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline with Images */}
      <section style={{ background: '#FFFFFF', padding: 'clamp(56px,9vw,96px) 0', borderTop: '1px solid rgba(0,0,0,.06)' }}>
        <div className="container-custom">
          <motion.div {...fd()} style={{ marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#888', marginBottom: 12 }}>
              Timeline
            </div>
            <h2 style={{
              fontSize: 'clamp(1.5rem,3.5vw,2.5rem)',
              fontWeight: 700,
              color: '#0D0D0D',
              letterSpacing: '-.03em',
              lineHeight: 1.1,
              fontFamily: "'Space Grotesk',sans-serif",
              margin: 0
            }}>
              Where we've been
            </h2>
          </motion.div>

          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {timeline.map((t, i) => (
              <motion.div
                key={i}
                {...fd(i * 0.08)}
                className="timeline-item"
                style={{
                  display: 'grid',
                  gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
                  gap: 'clamp(2rem,4vw,3.5rem)',
                  padding: 'clamp(28px,4vw,40px) 0',
                  borderBottom: i < timeline.length - 1 ? '1px solid rgba(0,0,0,.07)' : 'none',
                  alignItems: 'center'
                }}
              >
                <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                  <img
                    src={t.image}
                    alt={t.title}
                    style={{
                      width: '100%',
                      height: 280,
                      objectFit: 'cover',
                      borderRadius: 8,
                      boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
                    }}
                  />
                </div>

                <div style={{ order: i % 2 === 0 ? 2 : 1 }}>
                  <div style={{
                    fontSize: 'clamp(0.875rem,1.5vw,1rem)',
                    fontWeight: 700,
                    color: '#2563EB',
                    fontFamily: "'Space Grotesk',sans-serif",
                    marginBottom: 10
                  }}>
                    {t.year}
                  </div>
                  <h3 style={{
                    fontSize: 'clamp(0.9375rem,1.5vw,1.0625rem)',
                    fontWeight: 700,
                    color: '#0D0D0D',
                    marginBottom: 7,
                    fontFamily: "'Space Grotesk',sans-serif",
                    lineHeight: 1.2
                  }}>
                    {t.title}
                  </h3>
                  <p style={{
                    fontSize: 13.5,
                    color: '#404040',
                    lineHeight: 1.74,
                    margin: 0
                  }}>
                    {t.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles with Icons */}
      <section style={{ background: '#FAFAFA', padding: 'clamp(56px,9vw,96px) 0', borderTop: '1px solid rgba(0,0,0,.06)' }}>
        <div className="container-custom">
          <motion.div {...fd()} style={{ marginBottom: 'clamp(2.5rem,5vw,3.5rem)' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#888', marginBottom: 12 }}>
              How We Build
            </div>
            <h2 style={{
              fontSize: 'clamp(1.5rem,3.5vw,2.5rem)',
              fontWeight: 700,
              color: '#0D0D0D',
              letterSpacing: '-.03em',
              lineHeight: 1.1,
              fontFamily: "'Space Grotesk',sans-serif",
              margin: 0
            }}>
              Engineering principles we actually follow
            </h2>
          </motion.div>

          <div className="about-principles-grid">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.n} {...fd(i * 0.06)}>
                  <div style={{
                    padding: 'clamp(22px,3vw,32px)',
                    height: '100%',
                    background: '#FFFFFF',
                    borderTop: '1px solid rgba(0,0,0,.07)'
                  }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      background: `${p.color}12`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 16
                    }}>
                      <Icon size={20} color={p.color} strokeWidth={2} />
                    </div>

                    <div style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '.1em',
                      color: '#2563EB',
                      marginBottom: 12
                    }}>
                      {p.n}
                    </div>

                    <h3 style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: '#0D0D0D',
                      marginBottom: 9,
                      fontFamily: "'Space Grotesk',sans-serif",
                      lineHeight: 1.3
                    }}>
                      {p.h}
                    </h3>

                    <p style={{
                      fontSize: 13,
                      color: '#404040',
                      lineHeight: 1.74,
                      margin: 0
                    }}>
                      {p.b}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section style={{ background: '#FFFFFF', padding: 'clamp(56px,9vw,96px) 0', borderTop: '1px solid rgba(0,0,0,.06)' }}>
        <div className="container-custom">
          <motion.div {...fd()} style={{ marginBottom: 'clamp(2.5rem,5vw,3.5rem)' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#888', marginBottom: 12 }}>
              The Team
            </div>
            <h2 style={{
              fontSize: 'clamp(1.5rem,3.5vw,2.5rem)',
              fontWeight: 700,
              color: '#0D0D0D',
              letterSpacing: '-.03em',
              lineHeight: 1.1,
              fontFamily: "'Space Grotesk',sans-serif",
              margin: '0 0 14px'
            }}>
              Small team, big impact
            </h2>
            <p style={{ fontSize: 'clamp(0.875rem,1.4vw,0.9375rem)', color: '#404040', lineHeight: 1.7, margin: 0, maxWidth: 600 }}>
              We're a lean engineering team focused on building systems that work. No corporate bureaucracy, just practical solutions.
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(20px,3vw,32px)',
            maxWidth: 900,
            margin: '0 auto'
          }}>
            {team.map((member, i) => (
              <motion.div key={i} {...fd(i * 0.1)}>
                <div style={{
                  background: '#FAFAFA',
                  borderRadius: 8,
                  overflow: 'hidden',
                  border: '1px solid rgba(0,0,0,.07)'
                }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      width: '100%',
                      height: 280,
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ padding: 20 }}>
                    <h3 style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: '#0D0D0D',
                      marginBottom: 4,
                      fontFamily: "'Space Grotesk',sans-serif"
                    }}>
                      {member.name}
                    </h3>
                    <div style={{
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: '#2563EB',
                      marginBottom: 10
                    }}>
                      {member.role}
                    </div>
                    <p style={{
                      fontSize: 13,
                      color: '#404040',
                      lineHeight: 1.6,
                      margin: 0
                    }}>
                      {member.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Social Proof */}
      <section style={{ background: '#FFFFFF', padding: 'clamp(60px,9vw,80px) 0', borderTop: '1px solid #E2E8F0' }}>
        <div className="container-custom">
          <motion.div
            {...fd()}
            style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: '#64748B',
                marginBottom: 32,
              }}
            >
              DEPLOYED IN REAL ENVIRONMENTS
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 32,
                alignItems: 'center',
              }}
            >
              {clients.map((client, i) => (
                <div
                  key={i}
                  className="client-box"
                  style={{
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    transition: '0.3s ease',
                    opacity: 0.9,
                  }}
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    style={{
                      maxHeight: 45,
                      maxWidth: '100%',
                      objectFit: 'contain',
                    }}
                  />

                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#64748B',
                      textAlign: 'center',
                    }}
                  >
                    {client.name}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <style>{`
    .client-box:hover {
      transform: scale(1.06);
      opacity: 1;
    }
  `}</style>
      </section>

      <CTABanner />

      <style>{`
        .about-origin-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(3rem,6vw,5rem);
          align-items: center;
        }
        
        .about-principles-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(20px,3vw,32px);
        }
        
        .principle-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
        }
        
        .team-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
        }
        
        @media (max-width: 900px) {
          .about-principles-grid { 
            grid-template-columns: repeat(2, 1fr); 
          }
          .timeline-item {
            grid-template-columns: 1fr !important;
          }
          .timeline-item > div {
            order: 2 !important;
          }
          .timeline-item > div:first-child {
            order: 1 !important;
          }
        }
        
        @media (max-width: 768px) {
          .about-origin-grid { 
            grid-template-columns: 1fr; 
          }
          .about-origin-grid > div:first-child {
            order: 2;
          }
          .about-origin-grid > div:last-child {
            order: 1;
          }
        }
        
        @media (max-width: 560px) {
          .about-principles-grid { 
            grid-template-columns: 1fr; 
          }
        }
      `}</style>
    </>
  );
}