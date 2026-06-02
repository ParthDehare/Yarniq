export default function SVGDivider({ type = 'chain' }) {
  if (type === 'chain') {
    return (
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '3rem 0', opacity: 0.5 }}>
        <svg width="200" height="20" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 10 Q 10 0, 20 10 T 40 10 T 60 10 T 80 10 T 100 10 T 120 10 T 140 10 T 160 10 T 180 10 T 200 10" stroke="var(--color-dusty-rose)" strokeWidth="2" strokeDasharray="8 4" fill="none" strokeLinecap="round"/>
        </svg>
      </div>
    );
  }

  if (type === 'underline') {
    return (
      <div style={{ width: '100%', marginTop: '0.5rem', opacity: 0.6 }}>
        <svg width="120" height="10" viewBox="0 0 120 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 5 Q 30 8, 60 4 T 118 6" stroke="var(--color-sage)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </svg>
      </div>
    );
  }

  return null;
}
