'use client';

import SVGDivider from './SVGDivider';

export default function StorySection() {
  return (
    <section id="story" className="section" style={{ background: 'var(--color-cream)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          {/* Left: Text Content */}
          <div className="reveal" style={{ position: 'relative' }}>
            <span style={{ 
              position: 'absolute', 
              top: '-40px', 
              left: '-20px', 
              fontSize: '12rem', 
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-dusty-rose)', 
              opacity: 0.15,
              lineHeight: 1,
              pointerEvents: 'none'
            }}>“</span>
            
            <h2 style={{ marginBottom: '0' }}>Our Story</h2>
            <SVGDivider type="underline" />

            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--color-taupe)', fontSize: '1.1rem' }}>
              <p>
                Yarniq began as a quiet evening ritual. With a single wooden hook and a skein of soft cotton yarn, I discovered the meditative rhythm of transforming thread into tangible warmth.
              </p>
              
              <p style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: '1.8rem', 
                color: 'var(--color-terracotta)', 
                fontStyle: 'italic',
                paddingLeft: '1.5rem',
                borderLeft: '2px solid var(--color-dusty-rose)',
                margin: '1rem 0'
              }}>
                Every loop and stitch holds a fragment of time, woven with intention and care.
              </p>

              <p>
                Today, Yarniq represents a bridge between traditional craftsmanship and modern design. We believe that the objects we surround ourselves with should tell a story—one of patience, artistry, and genuine human touch.
              </p>
              <p>
                From delicate amigurumi to sturdy, elegant totes, each piece is crafted slowly, ensuring it will be cherished for years to come.
              </p>
            </div>
          </div>

          {/* Right: Portrait Image */}
          <div className="reveal reveal-delay-2" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <div style={{ position: 'relative', maxWidth: '400px', width: '100%' }}>
              
              {/* Hand-drawn SVG border */}
              <div style={{ position: 'absolute', inset: '-15px', zIndex: 0 }}>
                <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none">
                  <rect x="2" y="2" width="96" height="96" rx="15" stroke="var(--color-sage)" strokeWidth="0.5" strokeDasharray="4 4" fill="none"/>
                </svg>
              </div>

              {/* Image Card */}
              <div style={{ 
                width: '100%', 
                aspectRatio: '3/4', 
                borderRadius: '24px', 
                overflow: 'hidden', 
                position: 'relative', 
                zIndex: 1,
                boxShadow: 'var(--shadow-warm)'
              }}>
                <img src="/images/story/maker.png" alt="Prachee crafting" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Signature */}
              <div style={{ position: 'absolute', bottom: '-40px', right: '20px', zIndex: 2 }}>
                <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 20 Q 20 15, 30 25 T 50 15 T 70 25 T 90 15 Q 100 20, 110 25" stroke="var(--color-plum)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  <text x="60" y="38" fontFamily="var(--font-heading)" fontSize="16" fill="var(--color-plum)" fontStyle="italic" textAnchor="middle">— Prachee</text>
                </svg>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
