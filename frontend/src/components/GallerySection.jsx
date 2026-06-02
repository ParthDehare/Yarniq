'use client';

import Link from 'next/link';

export default function GallerySection() {
  const images = [
    { id: 1, src: '/images/gallery/bunny.png', title: 'Lavender Bunny', span: false },
    { id: 2, src: '/images/gallery/pillow.png', title: 'Bobble Stitch Pillow', span: true },
    { id: 3, src: '/images/gallery/keychain.png', title: 'Charm Collection', span: false },
    { id: 4, src: '/images/gallery/coasters.png', title: 'Earth Tone Coasters', span: false },
    { id: 5, src: '/images/hero/teddy.png', title: 'Classic Teddy', span: false },
    { id: 6, src: '/images/hero/scarf.png', title: 'Lace Scarf', span: true },
  ];

  return (
    <section id="gallery" className="section" style={{ padding: '6rem 5%' }}>
      <div className="container">
        
        <h2 className="reveal" style={{ 
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(4rem, 8vw, 80px)',
          color: 'var(--color-plum)',
          opacity: 0.8,
          marginBottom: '3rem',
          lineHeight: 1
        }}>
          Gallery
        </h2>

        {/* Masonry Grid Simulation using CSS Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gridAutoRows: '250px',
          gap: '16px',
          marginBottom: '4rem'
        }}>
          {images.map((img, i) => (
            <div 
              key={img.id} 
              className="gallery-item reveal"
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: 'var(--shadow-warm)',
                gridRow: img.span ? 'span 2' : 'span 1',
                animationDelay: `${i * 0.1}s`
              }}
            >
              <img 
                src={img.src} 
                alt={img.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              
              {/* Hover Overlay */}
              <div className="overlay" style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(61, 32, 53, 0.4)',
                backdropFilter: 'blur(2px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <h4 style={{ 
                  fontFamily: 'var(--font-heading)', 
                  fontStyle: 'italic', 
                  fontSize: '1.5rem', 
                  color: 'var(--color-cream)',
                  margin: 0
                }}>
                  {img.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Soft CTA */}
        <div className="reveal" style={{ textAlign: 'center' }}>
          <Link href="https://instagram.com" target="_blank" style={{ 
            fontFamily: 'var(--font-label)',
            color: 'var(--color-terracotta)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: '0.9rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            borderBottom: '1px solid var(--color-terracotta)',
            paddingBottom: '2px'
          }}>
            Follow our journey
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

      </div>

      <style>{`
        .gallery-item .overlay {
          clip-path: inset(100% 0 0 0);
          transition: clip-path 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gallery-item:hover .overlay {
          clip-path: inset(0 0 0 0);
        }
      `}</style>
    </section>
  );
}
