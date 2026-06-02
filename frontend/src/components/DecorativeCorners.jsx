'use client';

export default function DecorativeCorners() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: -1, overflow: 'hidden' }}>
      
      {/* Top Left Flower */}
      <img 
        src="/images/floral-corner.png" 
        alt="Floral Corner" 
        style={{
          position: 'absolute',
          top: '-80px',
          left: '-80px',
          width: '400px',
          opacity: 0.25,
          mixBlendMode: 'multiply',
          transform: 'rotate(15deg)'
        }}
      />
      
      {/* Bottom Right Flower */}
      <img 
        src="/images/floral-corner.png" 
        alt="Floral Corner" 
        style={{
          position: 'absolute',
          bottom: '-100px',
          right: '-100px',
          width: '450px',
          opacity: 0.22,
          mixBlendMode: 'multiply',
          transform: 'rotate(195deg)'
        }}
      />

      {/* Scattered Subtle Hearts */}
      <svg width="24" height="24" viewBox="0 0 24 24" style={{ position: 'absolute', top: '15%', right: '12%', opacity: 0.35, transform: 'rotate(15deg)' }}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="var(--color-dusty-rose)"/>
      </svg>
      <svg width="18" height="18" viewBox="0 0 24 24" style={{ position: 'absolute', bottom: '35%', left: '8%', opacity: 0.25, transform: 'rotate(-25deg)' }}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="var(--color-terracotta)"/>
      </svg>
      <svg width="32" height="32" viewBox="0 0 24 24" style={{ position: 'absolute', top: '65%', right: '8%', opacity: 0.2, transform: 'rotate(-10deg)' }}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="var(--color-dusty-rose)" strokeWidth="1.5"/>
      </svg>
      <svg width="20" height="20" viewBox="0 0 24 24" style={{ position: 'absolute', top: '25%', left: '15%', opacity: 0.2, transform: 'rotate(5deg)' }}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="var(--color-plum)"/>
      </svg>

    </div>
  );
}
