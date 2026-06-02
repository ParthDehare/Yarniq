'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="card reveal" style={{ padding: '3rem', borderRadius: '24px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--color-plum)', marginBottom: '2rem', textAlign: 'center' }}>
        Get in Touch
      </h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-label)', color: 'var(--color-plum)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>Name</label>
          <input 
            type="text" 
            className="input" 
            required 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-label)', color: 'var(--color-plum)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>Email</label>
          <input 
            type="email" 
            className="input" 
            required 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-label)', color: 'var(--color-plum)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>Message</label>
          <textarea 
            className="input" 
            rows="5" 
            required
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={status === 'loading'}
          style={{ 
            width: '100%', 
            padding: '1rem',
            background: status === 'success' ? 'var(--color-sage)' : 'var(--color-plum)',
            opacity: status === 'loading' ? 0.7 : 1
          }}
        >
          {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
