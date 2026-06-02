'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="section" style={{ 
      minHeight: 'calc(100vh - 85px)', // subtract nav height approx
      display: 'flex',
      alignItems: 'center',
      paddingTop: '2rem',
      paddingBottom: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative SVG Yarn Tangle Top-Right */}
      <div style={{ position: 'absolute', top: '-50px', right: '-50px', opacity: 0.1, pointerEvents: 'none', zIndex: 0 }}>
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M200 50 C 300 100, 350 200, 250 300 C 150 400, 50 300, 100 200 C 150 100, 250 50, 300 150" stroke="var(--color-plum)" strokeWidth="1" strokeDasharray="5,5"/>
          <path d="M100 100 C 50 200, 150 350, 250 250 C 350 150, 250 50, 150 150" stroke="var(--color-dusty-rose)" strokeWidth="2" fill="none"/>
          <circle cx="200" cy="200" r="100" stroke="var(--color-sage)" strokeWidth="0.5" fill="none"/>
        </svg>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}>
          
          {/* Left: Text Content (55%) */}
          <div style={{ flex: '1 1 500px', maxWidth: '100%' }}>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(4rem, 6vw, 72px)',
              color: 'var(--color-plum)',
              fontStyle: 'italic',
              fontWeight: 600,
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              animation: 'fadeUp 0.8s ease-out forwards',
            }}>
              Handcrafted<br/>with yarn,<br/>made with love.
            </h1>
            
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.2rem',
              color: 'var(--color-taupe)',
              marginBottom: '3rem',
              maxWidth: '400px',
              animation: 'fadeUp 0.8s ease-out 0.2s forwards',
              opacity: 0,
              transform: 'translateY(20px)'
            }}>
              Premium artisanal crochet pieces, meticulously designed to bring warmth and joy to your everyday life.
            </p>

            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginBottom: '4rem',
              animation: 'fadeUp 0.8s ease-out 0.4s forwards',
              opacity: 0,
              transform: 'translateY(20px)'
            }}>
              <Link href="/#creations" className="btn btn-primary" style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute', inset: 0, borderRadius: '9999px',
                  boxShadow: '0 0 0 4px rgba(201, 137, 122, 0.3)',
                  animation: 'pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }}></span>
                <span style={{ position: 'relative', zIndex: 1 }}>Explore Creations</span>
              </Link>
              <Link href="/#story" className="btn btn-ghost">
                Our Story
              </Link>
            </div>

            {/* Trust Badges */}
            <div style={{ 
              display: 'flex', 
              gap: '2rem',
              animation: 'fadeUp 0.8s ease-out 0.6s forwards',
              opacity: 0,
              transform: 'translateY(20px)'
            }}>
              {[
                { icon: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z', text: '100% Handmade' },
                { icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z', text: 'Custom Orders' },
                { icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', text: 'Premium Yarn' }
              ].map((badge, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-sage)" strokeWidth="1.5" strokeLinecap="round">
                    <path d={badge.icon} />
                  </svg>
                  <span style={{ fontFamily: 'var(--font-label)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-taupe)' }}>
                    {badge.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Collage (45%) */}
          <div style={{ flex: '1 1 400px', position: 'relative', height: '600px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', height: '100%', position: 'relative' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
                <div className="card" style={{ 
                  height: '280px', 
                  borderRadius: '24px', 
                  transform: 'rotate(-1.5deg)', 
                  overflow: 'hidden',
                  animation: 'fadeUp 1s ease-out 0.3s forwards', opacity: 0
                }}>
                  <img src="/images/hero/teddy.png" alt="Crochet Teddy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="card" style={{ 
                  height: '220px', 
                  borderRadius: '24px', 
                  transform: 'rotate(1deg)', 
                  overflow: 'hidden',
                  animation: 'fadeUp 1s ease-out 0.5s forwards', opacity: 0
                }}>
                  <img src="/images/hero/scarf.png" alt="Crochet Scarf" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '-1rem' }}>
                <div className="card" style={{ 
                  height: '240px', 
                  borderRadius: '24px', 
                  transform: 'rotate(1.5deg)', 
                  overflow: 'hidden',
                  animation: 'fadeUp 1s ease-out 0.4s forwards', opacity: 0
                }}>
                  <img src="/images/hero/flowers.png" alt="Crochet Flowers" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="card" style={{ 
                  height: '300px', 
                  borderRadius: '24px', 
                  transform: 'rotate(-1deg)', 
                  overflow: 'hidden',
                  animation: 'fadeUp 1s ease-out 0.6s forwards', opacity: 0
                }}>
                  <img src="/images/hero/bag.png" alt="Crochet Bag" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseRing {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(201, 137, 122, 0.5); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(201, 137, 122, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(201, 137, 122, 0); }
        }
      `}</style>
    </section>
  );
}
