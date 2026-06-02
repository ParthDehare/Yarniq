'use client';

export default function CustomOrderSection() {
  return (
    <section id="custom-orders" className="section" style={{ 
      background: 'linear-gradient(to bottom, rgba(181, 98, 74, 0.05), rgba(201, 137, 122, 0.05))',
      borderTop: '1px solid rgba(201, 137, 122, 0.1)',
      borderBottom: '1px solid rgba(201, 137, 122, 0.1)',
    }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        <div className="text-center reveal">
          <h2 style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 56px)',
            color: 'var(--color-plum)',
            fontStyle: 'italic',
            marginBottom: '1rem'
          }}>
            Something made just for you.
          </h2>
          <p style={{ color: 'var(--color-taupe)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 4rem auto' }}>
            Looking for a specific color palette or a completely unique design? Let's collaborate to bring your vision to life.
          </p>
        </div>

        {/* Feature Icons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          {[
            { 
              icon: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z', 
              title: 'Made with Love', 
              desc: 'Every piece is crafted entirely by hand with meticulous attention to detail.' 
            },
            { 
              icon: 'M20 7h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM9 4h6v3H9V4z', 
              title: 'Premium Materials', 
              desc: 'We source only the softest, most durable organic cottons and wools.' 
            },
            { 
              icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', 
              title: 'Unique to You', 
              desc: 'Choose your colors, size, and pattern for a truly one-of-a-kind piece.' 
            }
          ].map((feature, i) => (
            <div key={i} className="reveal text-center" style={{ animationDelay: `${i * 0.1}s` }}>
              <div style={{ 
                width: '64px', height: '64px', 
                borderRadius: '50%', 
                background: 'var(--color-ivory)',
                border: '1px solid var(--color-dusty-rose)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-terracotta)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={feature.icon} />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--color-plum)' }}>{feature.title}</h3>
              <p style={{ color: 'var(--color-taupe)', fontSize: '0.95rem' }}>{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="card reveal" style={{ padding: '3rem', borderRadius: '24px' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={(e) => e.preventDefault()}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-label)', color: 'var(--color-plum)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>Name</label>
                <input type="text" className="input" placeholder="Your name" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-label)', color: 'var(--color-plum)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>Email</label>
                <input type="email" className="input" placeholder="your@email.com" />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-label)', color: 'var(--color-plum)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>What would you like?</label>
              <textarea className="input" rows="4" placeholder="Describe the item, colors, and any specific details..."></textarea>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-label)', color: 'var(--color-plum)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>Occasion (Optional)</label>
                <input type="text" className="input" placeholder="e.g. Birthday gift, Baby shower" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-label)', color: 'var(--color-plum)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>Budget Range</label>
                <select className="input" style={{ appearance: 'none', cursor: 'pointer' }}>
                  <option>Under ₹1,000</option>
                  <option>₹1,000 - ₹3,000</option>
                  <option>₹3,000 - ₹5,000</option>
                  <option>₹5,000+</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ 
              width: '100%', 
              marginTop: '1rem', 
              padding: '1rem',
              background: 'var(--color-plum)',
              color: 'var(--color-cream)'
            }}>
              Send My Request →
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
