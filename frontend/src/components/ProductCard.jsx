'use client';

import Link from 'next/link';
import useCartStore from '@/store/cartStore';

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    openCart();
  };

  const isSoldOut = product.stock === 0;

  return (
    <Link href={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
      <div 
        className="card"
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: '400px',
        }}
      >
        {/* Image Area (60%) */}
        <div style={{ height: '60%', minHeight: '240px', overflow: 'hidden', position: 'relative', background: 'var(--color-ivory)' }}>
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.title} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
              }}
              className="hover-zoom"
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>🧶</div>
          )}

          {/* Category Badge */}
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(250, 246, 240, 0.85)',
            backdropFilter: 'blur(4px)',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontFamily: 'var(--font-label)',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--color-taupe)',
            zIndex: 2
          }}>
            {product.category}
          </div>

          {/* Sold Out Overlay */}
          {isSoldOut && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(250, 246, 240, 0.7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 3
            }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.5rem',
                color: 'var(--color-plum)',
                fontStyle: 'italic',
                padding: '0.5rem 1.5rem',
                border: '1px solid var(--color-plum)',
                borderRadius: '9999px',
                background: 'var(--color-cream)'
              }}>
                Sold Out
              </span>
            </div>
          )}
        </div>

        {/* Content Area (40%) */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.4rem',
            color: 'var(--color-plum)',
            marginBottom: '0.25rem',
            lineHeight: 1.2
          }}>
            {product.title}
          </h3>
          
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            color: 'var(--color-taupe)',
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            flex: 1
          }}>
            {product.description || 'Beautiful handcrafted piece made with premium materials.'}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
            <span style={{
              fontFamily: 'var(--font-label)',
              fontSize: '1.1rem',
              fontWeight: 500,
              color: 'var(--color-terracotta)'
            }}>
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isSoldOut}
            className="btn btn-primary"
            style={{
              width: '100%',
              marginTop: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              opacity: isSoldOut ? 0.5 : 1,
              cursor: isSoldOut ? 'not-allowed' : 'pointer'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            Add to Cart
          </button>
        </div>

        <style>{`
          .card:hover .hover-zoom {
            transform: scale(1.04);
          }
        `}</style>
      </div>
    </Link>
  );
}
