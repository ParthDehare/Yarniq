import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact | Yarniq',
  description: 'Get in touch with Yarniq for custom crochet orders and inquiries.',
};

export default function ContactPage() {
  return (
    <div style={{ minHeight: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column', background: 'var(--color-ivory)' }}>
      {/* Decorative Header */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '6rem 0 3rem 0', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: 'var(--color-plum)', fontStyle: 'italic', marginBottom: '1rem' }}>
          Let's Talk
        </h1>
        <p style={{ color: 'var(--color-taupe)', fontFamily: 'var(--font-body)', fontSize: '1.1rem' }}>
          Questions about an order? Ready to start a custom piece?
        </p>
      </div>

      {/* Main Content */}
      <div className="container" style={{ flex: 1, padding: '0 5% 6rem 5%' }}>
        <ContactForm />
      </div>
    </div>
  );
}
