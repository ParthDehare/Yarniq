'use client';

import useCartStore from '@/store/cartStore';
import Link from 'next/link';

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const items = useCartStore((s) => s.items);
  const closeCart = useCartStore((s) => s.closeCart);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(61, 32, 53, 0.3)',
          backdropFilter: 'blur(4px)',
          zIndex: 100,
        }}
        onClick={closeCart}
      />

      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100%',
          width: '100%',
          maxWidth: '450px',
          background: 'var(--color-cream)',
          zIndex: 101,
          boxShadow: 'var(--shadow-warm-hover)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
      >
        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>

        {/* Header */}
        <div style={{
          padding: '2rem',
          borderBottom: '1px solid rgba(201, 137, 122, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.25rem', color: 'var(--color-plum)' }}>Your Cart</h2>
            <p style={{ color: 'var(--color-taupe)', fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem' }}>
              {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
            </p>
          </div>
          <button
            onClick={closeCart}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-taupe)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
          {items.length === 0 ? (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-dusty-rose)" strokeWidth="1" strokeLinecap="round" style={{ marginBottom: '1rem' }}>
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                <path d="M2 12h20"/>
              </svg>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--color-plum)', marginBottom: '0.5rem' }}>Your cart is empty</h3>
              <p style={{ color: 'var(--color-taupe)' }}>Add some handcrafted goodies!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {items.map((item) => (
                <div key={item.productId} style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '80px', height: '100px', borderRadius: '12px', overflow: 'hidden', background: 'var(--color-ivory)' }}>
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🧶</div>
                    )}
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h4 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--color-plum)' }}>{item.title}</h4>
                    <p style={{ color: 'var(--color-terracotta)', fontFamily: 'var(--font-label)', margin: '0.25rem 0 0.5rem 0', fontWeight: 500 }}>
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(122, 101, 96, 0.2)', borderRadius: '20px', padding: '0.25rem 0.5rem' }}>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          style={{ background: 'transparent', border: 'none', color: 'var(--color-taupe)', cursor: 'pointer', padding: '0 0.5rem' }}
                        >−</button>
                        <span style={{ fontSize: '0.9rem', fontFamily: 'var(--font-label)', color: 'var(--color-plum)', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          style={{ background: 'transparent', border: 'none', color: 'var(--color-taupe)', cursor: 'pointer', padding: '0 0.5rem' }}
                        >+</button>
                      </div>
                      
                      <button
                        onClick={() => removeItem(item.productId)}
                        style={{ background: 'transparent', border: 'none', color: 'var(--color-taupe)', fontSize: '0.8rem', textDecoration: 'underline', cursor: 'pointer' }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '2rem', borderTop: '1px solid rgba(201, 137, 122, 0.2)', background: 'var(--color-ivory)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-taupe)' }}>Subtotal</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--color-plum)', fontWeight: 600 }}>
                ₹{totalPrice.toLocaleString('en-IN')}
              </span>
            </div>

            <Link href="/checkout" onClick={closeCart} style={{ textDecoration: 'none' }}>
              <button className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                Proceed to Checkout
              </button>
            </Link>

            <button
              onClick={clearCart}
              style={{ width: '100%', background: 'transparent', border: 'none', color: 'var(--color-taupe)', marginTop: '1rem', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.9rem' }}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
