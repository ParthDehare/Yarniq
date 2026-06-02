'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import useCartStore from '@/store/cartStore';
import { BRAND, NAV_LINKS } from '@/lib/constants';
import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const items = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.openCart);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(250, 246, 240, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(201, 137, 122, 0.2)',
          transition: 'padding 0.3s ease',
          padding: scrolled ? '0.5rem 0' : '1rem 0'
        }}
      >
        <div className="container flex items-center justify-between" style={{ padding: '0 5%' }}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4" style={{ textDecoration: 'none' }}>
            {/* Minimal SVG Crochet Hook + Bloom Logo */}
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 80 Q 50 20 80 80" stroke="var(--color-dusty-rose)" strokeWidth="4" fill="none" strokeLinecap="round"/>
              <circle cx="50" cy="40" r="15" fill="var(--color-terracotta)" opacity="0.8"/>
              <path d="M40 85 L 60 15" stroke="var(--color-sage)" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <div className="flex" style={{ flexDirection: 'column' }}>
              <span style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: '2rem', 
                color: 'var(--color-plum)',
                fontStyle: 'italic',
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '0.05em'
              }}>
                {BRAND.name}
              </span>
              <div className="flex items-center gap-2" style={{ marginTop: '4px' }}>
                <span style={{ width: '12px', height: '1px', background: 'var(--color-dusty-rose)' }}></span>
                <span style={{ 
                  fontFamily: 'var(--font-label)', 
                  fontSize: '0.7rem', 
                  color: 'var(--color-taupe)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase'
                }}>
                  {BRAND.tagline}
                </span>
                <span style={{ width: '12px', height: '1px', background: 'var(--color-dusty-rose)' }}></span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="flex items-center gap-8" style={{ display: 'none' }}>
            <style jsx>{`
              @media (min-width: 1024px) {
                .flex.items-center.gap-8 { display: flex !important; }
              }
            `}</style>
            <div className="flex items-center gap-6">
              {NAV_LINKS.map((link, i) => (
                <div key={link.path} className="flex items-center gap-6">
                  <Link href={link.path} className="nav-link">
                    {link.name}
                  </Link>
                  {i < NAV_LINKS.length - 1 && (
                    <span style={{ color: 'var(--color-dusty-rose)', fontSize: '0.5rem' }}>•</span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4" style={{ marginLeft: '1rem' }}>
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="nav-link" style={{ background: 'transparent', border: 'none' }}>Sign In</button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <UserButton afterSignOutUrl="/" />
              </Show>

              {/* Cart Button */}
              <button
                onClick={openCart}
                style={{
                  position: 'relative',
                  background: 'transparent',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-plum)" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {totalItems > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-10px',
                    background: 'var(--color-dusty-rose)',
                    color: 'var(--color-cream)',
                    fontSize: '0.7rem',
                    width: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    fontFamily: 'var(--font-label)',
                    fontWeight: 500
                  }}>
                    {totalItems}
                  </span>
                )}
              </button>

              <Link href="/#custom-orders" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}>
                Custom Order
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4" style={{ display: 'flex' }}>
            <style jsx>{`
              @media (min-width: 1024px) {
                .flex.items-center.gap-4 { display: none !important; }
              }
            `}</style>
            
            <button
              onClick={openCart}
              style={{
                position: 'relative',
                background: 'transparent',
                border: 'none',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-plum)" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-10px',
                  background: 'var(--color-dusty-rose)',
                  color: 'var(--color-cream)',
                  fontSize: '0.7rem',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  fontFamily: 'var(--font-label)'
                }}>
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '0.5rem',
                zIndex: 100
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-plum)" strokeWidth="1.5" strokeLinecap="round">
                {mobileOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: 'var(--color-cream)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: mobileOpen ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.5s cubic-bezier(0.77, 0, 0.175, 1)',
      }}>
        <div className="flex flex-col gap-8 text-center" style={{ flexDirection: 'column', textAlign: 'center', gap: '2rem' }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.5rem',
                color: 'var(--color-plum)',
                textDecoration: 'none',
                fontStyle: 'italic'
              }}
            >
              {link.name}
            </Link>
          ))}
          
          <div style={{ marginTop: '2rem' }}>
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="btn btn-ghost" onClick={() => setMobileOpen(false)}>Sign In</button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <UserButton afterSignOutUrl="/" />
            </Show>
          </div>
        </div>
      </div>
    </>
  );
}
