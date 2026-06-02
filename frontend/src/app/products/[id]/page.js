'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import useCartStore from '@/store/cartStore';
import { getProductById } from '@/lib/api';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const data = await getProductById(id);
        if (data) {
          setProduct(data);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product && product.stock > 0) {
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
      openCart();
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-ivory)' }}>
        <div className="spinner" style={{ borderColor: 'var(--color-dusty-rose)', borderTopColor: 'transparent' }}></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--color-ivory)' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', color: 'var(--color-plum)' }}>Oops</h1>
        <p style={{ color: 'var(--color-taupe)', marginBottom: '2rem' }}>{error || 'Product not found'}</p>
        <Link href="/#creations" className="btn btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const isSoldOut = product.stock === 0;

  return (
    <div style={{ background: 'var(--color-ivory)', minHeight: 'calc(100vh - 85px)' }}>
      {/* Breadcrumb */}
      <div className="container" style={{ padding: '2rem 5%' }}>
        <div style={{ fontFamily: 'var(--font-label)', fontSize: '0.85rem', color: 'var(--color-taupe)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <Link href="/" style={{ color: 'var(--color-taupe)' }}>Home</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <Link href="/#creations" style={{ color: 'var(--color-taupe)' }}>Shop</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ color: 'var(--color-dusty-rose)' }}>{product.title}</span>
        </div>
      </div>

      <div className="container" style={{ padding: '0 5% 6rem 5%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          
          {/* Left: Image */}
          <div style={{ 
            aspectRatio: '4/5', 
            borderRadius: '24px', 
            overflow: 'hidden', 
            boxShadow: 'var(--shadow-warm)',
            background: 'var(--color-cream)',
            position: 'relative'
          }}>
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem' }}>🧶</div>
            )}
          </div>

          {/* Right: Details */}
          <div>
            <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '9999px', background: 'var(--color-sage)', color: 'var(--color-cream)', fontFamily: 'var(--font-label)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              {product.category}
            </div>
            
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: 'var(--color-plum)', fontStyle: 'italic', marginBottom: '0.5rem', lineHeight: 1.1 }}>
              {product.title}
            </h1>
            
            <div style={{ fontFamily: 'var(--font-label)', fontSize: '1.5rem', color: 'var(--color-terracotta)', fontWeight: 500, marginBottom: '2rem' }}>
              ₹{product.price.toLocaleString('en-IN')}
            </div>

            <p style={{ color: 'var(--color-taupe)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              {product.description}
            </p>

            <div style={{ borderTop: '1px solid rgba(201, 137, 122, 0.2)', borderBottom: '1px solid rgba(201, 137, 122, 0.2)', padding: '1.5rem 0', marginBottom: '2rem' }}>
              {product.materials && product.materials.length > 0 && (
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <strong style={{ fontFamily: 'var(--font-label)', color: 'var(--color-plum)', textTransform: 'uppercase', fontSize: '0.85rem', width: '80px' }}>Materials</strong>
                  <span style={{ color: 'var(--color-taupe)' }}>{product.materials.join(', ')}</span>
                </div>
              )}
              <div style={{ display: 'flex', gap: '1rem' }}>
                <strong style={{ fontFamily: 'var(--font-label)', color: 'var(--color-plum)', textTransform: 'uppercase', fontSize: '0.85rem', width: '80px' }}>Status</strong>
                <span style={{ color: isSoldOut ? 'var(--color-dusty-rose)' : 'var(--color-sage)' }}>
                  {isSoldOut ? 'Sold Out' : `In Stock (${product.stock} available)`}
                </span>
              </div>
            </div>

            {/* Add to Cart Area */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'stretch' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                border: '1px solid var(--color-dusty-rose)', 
                borderRadius: '9999px',
                padding: '0.25rem 0.5rem',
                opacity: isSoldOut ? 0.5 : 1
              }}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={isSoldOut}
                  style={{ background: 'transparent', border: 'none', color: 'var(--color-plum)', padding: '0.5rem', cursor: isSoldOut ? 'not-allowed' : 'pointer' }}
                >−</button>
                <span style={{ width: '30px', textAlign: 'center', fontFamily: 'var(--font-label)', color: 'var(--color-plum)' }}>{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={isSoldOut}
                  style={{ background: 'transparent', border: 'none', color: 'var(--color-plum)', padding: '0.5rem', cursor: isSoldOut ? 'not-allowed' : 'pointer' }}
                >+</button>
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={isSoldOut}
                className="btn btn-primary"
                style={{ flex: 1, opacity: isSoldOut ? 0.5 : 1, cursor: isSoldOut ? 'not-allowed' : 'pointer' }}
              >
                {isSoldOut ? 'Sold Out' : 'Add to Cart'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
