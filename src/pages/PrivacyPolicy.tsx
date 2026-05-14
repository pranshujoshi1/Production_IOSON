import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const sections = [
  { heading: '1. Information We Collect', body: 'We collect information you provide directly to us, such as when you fill out our contact form, request a product demo, or communicate with us via email. This may include your name, email address, company name, and the content of your communications. We may also collect technical information such as your IP address and browser type through standard web analytics tools.' },
  { heading: '2. How We Use Your Information', body: 'We use the information we collect to respond to your inquiries, provide product demonstrations, communicate about services and updates relevant to your interests, improve our website and services, and comply with legal obligations. We do not sell your personal information to third parties.' },
  { heading: '3. Information Sharing', body: 'We do not share your personal information with third parties except as necessary to provide our services, when required by law, or with your explicit consent. Any third-party service providers we use are required to maintain the confidentiality and security of your information.' },
  { heading: '4. Data Security', body: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, loss, or alteration. However, no method of transmission over the internet or electronic storage is completely secure.' },
  { heading: '5. Cookies and Tracking', body: 'Our website may use cookies and similar tracking technologies to improve your browsing experience and analyze site traffic. You can control cookie settings through your browser preferences. We use analytics tools only in aggregated, anonymized form.' },
  { heading: '6. Data Retention', body: 'We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Contact form submissions are retained for a maximum of 24 months.' },
  { heading: '7. Your Rights', body: 'Depending on your jurisdiction, you may have rights to access, correct, or delete your personal data. You may also have the right to object to certain processing or request data portability. To exercise these rights, contact us at contact@iosonx.com.' },
  { heading: '8. Changes to This Policy', body: 'We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on our website and updating the effective date. Your continued use of our services after changes constitutes acceptance of the updated policy.' },
  { heading: '9. Contact Us', body: 'If you have questions about this Privacy Policy or our data practices, please contact us at: contact@iosonx.com' },
];

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — IOSON</title>
        <meta name="description" content="IOSON Privacy Policy — how we collect, use, and protect your information." />
      </Helmet>

      {/* Hero */}
      <section style={{ background: '#F5F5F5', paddingTop: 'clamp(96px,14vw,128px)', paddingBottom: 'clamp(40px,6vw,64px)' }}>
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8C8C8C', marginBottom: 16 }}>Legal</div>
            <h1 style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-.04em', lineHeight: 1.04, fontFamily: "'Space Grotesk',sans-serif", margin: '0 0 12px' }}>Privacy Policy</h1>
            <p style={{ fontSize: 13, color: '#8C8C8C' }}>Last updated: January 2025</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: '#F5F5F5', padding: 'clamp(32px,5vw,48px) 0 clamp(64px,10vw,112px)' }}>
        <div className="container-custom">
          <div style={{ maxWidth: 720 }}>
            <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,.07)', borderRadius: 14, padding: 'clamp(24px,4vw,48px)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {sections.map((s, i) => (
                <motion.div key={s.heading}
                  initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.05, duration: 0.45 }}>
                  <h2 style={{ fontSize: 'clamp(0.875rem,1.5vw,1rem)', fontWeight: 700, color: '#0D0D0D', marginBottom: 8, fontFamily: "'Space Grotesk',sans-serif" }}>{s.heading}</h2>
                  <p style={{ fontSize: 14, color: '#4B4B4B', lineHeight: 1.78, margin: 0 }}>{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
