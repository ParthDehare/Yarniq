'use client';

import Link from 'next/link';
import { BRAND, NAV_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-plum)', color: 'var(--color-ivory)', position: 'relative' }}>
      
      {/* Top Decorative Banner */}
      <div style={{ width: '100%', height: '24px', background: 'var(--color-plum)', overflow: 'hidden', display: 'flex' }}>
        <div style={{ display: 'flex', animation: 'slideLeft 20s linear infinite' }}>
          {[...Array(20)].map((_, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0 0.5rem' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-dusty-rose)" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--color-dusty-rose)" stroke="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ padding: '5rem 5% 2rem 5%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
          
          {/* Left: Brand */}
          <div>
            <div className="flex items-center gap-3" style={{ marginBottom: '1.5rem' }}>
              <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 80 Q 50 20 80 80" stroke="var(--color-cream)" strokeWidth="4" fill="none" strokeLinecap="round"/>
                <circle cx="50" cy="40" r="15" fill="var(--color-dusty-rose)" opacity="0.8"/>
              </svg>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontStyle: 'italic', fontWeight: 600 }}>
                {BRAND.name}
              </span>
            </div>
            <p style={{ color: 'var(--color-taupe)', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: '300px' }}>
              {BRAND.description}
            </p>
          </div>

          {/* Center: Nav Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            {NAV_LINKS.map(link => (
              <Link key={link.path} href={link.path} style={{
                fontFamily: 'var(--font-label)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                fontSize: '0.85rem',
                color: 'var(--color-cream)',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }} className="footer-link">
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right: Instagram Preview */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem', marginBottom: '1.5rem', color: 'var(--color-cream)' }}>
              Follow Along
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.5rem', maxWidth: '200px' }}>
              {['/images/gallery/bunny.png', '/images/gallery/coasters.png', '/images/gallery/keychain.png', '/images/gallery/pillow.png'].map((src, i) => (
                <div key={i} style={{ aspectRatio: '1/1', borderRadius: '8px', overflow: 'hidden' }}>
                  <img src={src} alt="Instagram preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
            <a href="https://instagram.com" target="_blank" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', background: 'var(--color-dusty-rose)' }}>
              @yarniq.crafts
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(201, 137, 122, 0.2)', paddingTop: '2rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-taupe)' }}>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .footer-link:hover {
          color: var(--color-sage) !important;
        }
      `}</style>
    </footer>
  );
}
