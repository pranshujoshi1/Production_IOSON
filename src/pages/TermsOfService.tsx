import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const sections = [
  { heading: '1. Acceptance of Terms', body: 'By accessing and using the IOSON website (ioson.in) or any of our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.' },
  { heading: '2. Use of Website', body: 'You may use our website for lawful purposes only. You agree not to use this site in any way that is unlawful, harmful, or that could damage, disable, or impair the website or interfere with other users. You may not attempt to gain unauthorized access to any part of our systems.' },
  { heading: '3. Intellectual Property', body: "All content on this website — including text, graphics, logos, product names, and software — is the property of IOSON Technologies Pvt. Ltd. or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission." },
  { heading: '4. Product and Service Information', body: 'Information about our products (Thalii, Pramaan) and services is provided for informational purposes. Specific terms, pricing, and service level agreements are governed by separate agreements entered into with individual clients. We reserve the right to modify product features and service offerings at any time.' },
  { heading: '5. Disclaimer of Warranties', body: 'This website is provided on an "as is" and "as available" basis. IOSON makes no warranties, expressed or implied, including without limitation, warranties of merchantability or fitness for a particular purpose. We do not warrant that the website will be error-free or uninterrupted.' },
  { heading: '6. Limitation of Liability', body: 'To the fullest extent permitted by law, IOSON shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, our website or services, even if IOSON has been advised of the possibility of such damages.' },
  { heading: '7. Third-Party Links', body: 'Our website may contain links to third-party websites. These links are provided for your convenience only. IOSON has no control over the content of third-party sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them.' },
  { heading: '8. Governing Law', body: 'These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of our services shall be subject to the exclusive jurisdiction of the courts in India.' },
  { heading: '9. Changes to Terms', body: 'IOSON reserves the right to modify these Terms at any time. Changes will be effective upon posting to the website. Your continued use of the website after changes constitutes your acceptance of the modified Terms.' },
  { heading: '10. Contact', body: 'For questions about these Terms, contact us at: contact@iosonx.com' },
];

export default function TermsOfService() {
  return (
    <>
      <Helmet>
        <title>Terms of Service — IOSON</title>
        <meta name="description" content="IOSON Terms of Service — the terms governing your use of our website and services." />
      </Helmet>

      {/* Hero */}
      <section style={{ background: '#F5F5F5', paddingTop: 'clamp(96px,14vw,128px)', paddingBottom: 'clamp(40px,6vw,64px)' }}>
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8C8C8C', marginBottom: 16 }}>Legal</div>
            <h1 style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-.04em', lineHeight: 1.04, fontFamily: "'Space Grotesk',sans-serif", margin: '0 0 12px' }}>Terms of Service</h1>
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
                  viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.04, duration: 0.45 }}>
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
