'use client';

import CheckoutForm from '@/components/CheckoutForm';

export default function CheckoutPage() {
  return (
    <div style={{ background: 'var(--color-ivory)', minHeight: 'calc(100vh - 85px)' }}>
      {/* Decorative Header */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '4rem 0 2rem 0', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--color-plum)', fontStyle: 'italic', marginBottom: '1rem' }}>
          Secure Checkout
        </h1>
        <div style={{ width: '60px', height: '2px', background: 'var(--color-dusty-rose)', margin: '0 auto' }}></div>
      </div>

      <div className="container" style={{ padding: '0 5% 6rem 5%' }}>
        <CheckoutForm />
      </div>
    </div>
  );
}
