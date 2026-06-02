'use client';

import SVGDivider from './SVGDivider';

export default function PortfolioSection() {
  const pieces = [
    {
      id: 'midnight-tote',
      title: 'The Midnight Tote',
      category: 'Bags & Accessories',
      idea: 'Inspired by clear, starless nights in the city, this piece was designed to be both highly functional and understatedly elegant.',
      craft: 'Hand-crocheted using 100% recycled cotton cord in a tight thermal stitch for structure and durability. The handles are reinforced with a hidden linen core.',
      image: '/images/hero/bag.png', // Fallback, using hero images for now
      reverse: false,
    },
    {
      id: 'autumn-bloom',
      title: 'Autumn Bloom Bouquet',
      category: 'Home Decor',
      idea: 'A request for a wedding anniversary gift that would never wilt. The goal was to capture the warmth of late October foliage.',
      craft: 'Each petal is individually shaped using a fine 2mm hook and mercerized Egyptian cotton, allowing for subtle gradients and a lifelike drape.',
      image: '/images/hero/flowers.png',
      reverse: true,
    },
    {
      id: 'sleepy-bear',
      title: 'Sleepy Bear Heirloom',
      category: 'Amigurumi',
      idea: 'Created as a first birthday gift, intended to be a lifelong companion that could withstand years of love and washing.',
      craft: 'Worked in a continuous spiral with ultra-soft chenille yarn. The features are embroidered rather than attached with safety eyes, ensuring it is perfectly safe for infants.',
      image: '/images/hero/teddy.png',
      reverse: false,
    }
  ];

  return (
    <section id="portfolio" className="section" style={{ padding: 0 }}>
      <div className="container" style={{ padding: '6rem 5%' }}>
        <h2 className="text-center reveal" style={{ marginBottom: '4rem' }}>Pieces We're Proud Of</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {pieces.map((piece, index) => (
            <div key={piece.id}>
              <div 
                className="reveal" 
                style={{ 
                  display: 'flex', 
                  flexDirection: piece.reverse ? 'row-reverse' : 'row',
                  flexWrap: 'wrap',
                  gap: '4rem',
                  alignItems: 'center',
                  padding: '4rem 0',
                }}
              >
                
                {/* Text Side */}
                <div style={{ flex: '1 1 400px' }}>
                  <span style={{ 
                    fontFamily: 'var(--font-label)', 
                    color: 'var(--color-sage)', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.1em', 
                    fontSize: '0.85rem',
                    fontWeight: 500
                  }}>
                    {piece.category}
                  </span>
                  
                  <h3 style={{ 
                    fontFamily: 'var(--font-heading)', 
                    fontSize: 'clamp(2.5rem, 4vw, 44px)', 
                    color: 'var(--color-plum)',
                    marginTop: '0.5rem',
                    marginBottom: '2rem'
                  }}>
                    {piece.title}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-label)', fontSize: '1rem', color: 'var(--color-terracotta)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The Idea</h4>
                      <p style={{ color: 'var(--color-taupe)', lineHeight: 1.8 }}>{piece.idea}</p>
                    </div>
                    
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-label)', fontSize: '1rem', color: 'var(--color-terracotta)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The Craft</h4>
                      <p style={{ color: 'var(--color-taupe)', lineHeight: 1.8 }}>{piece.craft}</p>
                    </div>
                  </div>
                </div>

                {/* Image Side */}
                <div style={{ flex: '1 1 400px', position: 'relative' }}>
                  
                  {/* Decorative corner stitch */}
                  <div style={{ 
                    position: 'absolute', 
                    top: '-20px', 
                    [piece.reverse ? 'right' : 'left']: '-20px',
                    zIndex: 2 
                  }}>
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 20 L 20 0 L 40 20 L 20 40 Z" stroke="var(--color-dusty-rose)" strokeWidth="1" fill="none"/>
                      <path d="M20 20 L 40 0 L 60 20 L 40 40 Z" stroke="var(--color-sage)" strokeWidth="1" fill="none"/>
                    </svg>
                  </div>

                  <div style={{ 
                    width: '100%', 
                    aspectRatio: '4/3', 
                    borderRadius: '24px', 
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-warm)',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    <img src={piece.image} alt={piece.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>

              </div>

              {/* Divider between rows (except last) */}
              {index < pieces.length - 1 && (
                <SVGDivider type="chain" />
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .reveal[style*="flex-direction: row-reverse"] {
            flex-direction: column !important;
          }
        }
      `}</style>
    </section>
  );
}
