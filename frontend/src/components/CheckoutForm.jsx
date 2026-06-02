'use client';

import { useState } from 'react';
import useCartStore from '@/store/cartStore';
import { createOrder, verifyPayment } from '@/lib/api';
import { RAZORPAY_KEY_ID, BRAND } from '@/lib/constants';

export default function CheckoutForm() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    shippingAddress: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.customerName || !formData.customerEmail || !formData.shippingAddress) {
        throw new Error('Please fill in all fields');
      }

      if (items.length === 0) {
        throw new Error('Your cart is empty');
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) throw new Error('Failed to load payment gateway');

      const orderData = {
        ...formData,
        items: items.map((item) => ({
          productId: item.productId,
          title: item.title,
          quantity: item.quantity,
          price: item.price,
          imageUrl: item.imageUrl || '',
        })),
        totalAmount: totalPrice,
      };

      const { data } = await createOrder(orderData);

      const options = {
        key: data.keyId || RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: BRAND.name,
        description: `${BRAND.tagline} — Order`,
        order_id: data.razorpayOrderId,
        handler: async (response) => {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: data.orderId,
            });
            setSuccess(true);
            clearCart();
          } catch (err) {
            setError('Payment verification failed. Please contact us.');
          }
        },
        prefill: {
          name: formData.customerName,
          email: formData.customerEmail,
        },
        theme: {
          color: '#3D2035', // Match the dark plum
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="card reveal" style={{ maxWidth: '600px', margin: '0 auto', padding: '4rem', textAlign: 'center', borderRadius: '24px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>✨</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--color-plum)', marginBottom: '1rem', fontStyle: 'italic' }}>
          Order Confirmed!
        </h2>
        <p style={{ color: 'var(--color-taupe)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
          Thank you for your purchase, <strong style={{ color: 'var(--color-plum)' }}>{formData.customerName}</strong>!
        </p>
        <p style={{ color: 'var(--color-taupe)', fontSize: '0.95rem', marginBottom: '2.5rem' }}>
          A confirmation email has been sent to {formData.customerEmail}
        </p>
        <a href="/" className="btn btn-primary">
          Return Home
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card reveal" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem', borderRadius: '24px' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        
        {/* Left: Form Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--color-plum)' }}>Shipping Details</h2>
          
          {error && (
            <div style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(230, 44, 64, 0.1)', color: 'var(--color-error)', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-label)', color: 'var(--color-plum)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>Full Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Your full name"
              className="input"
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-label)', color: 'var(--color-plum)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>Email Address</label>
            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              placeholder="your@email.com"
              className="input"
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-label)', color: 'var(--color-plum)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>Shipping Address</label>
            <textarea
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleChange}
              placeholder="Complete shipping address with pincode"
              className="input"
              rows={4}
              required
            />
          </div>
        </div>

        {/* Right: Order Summary */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: 'var(--color-ivory)', padding: '2rem', borderRadius: '16px', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontFamily: 'var(--font-label)', color: 'var(--color-taupe)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(201, 137, 122, 0.2)' }}>
              Order Summary
            </h3>
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {items.map((item) => (
                <div key={item.productId} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-plum)', fontSize: '0.95rem' }}>
                  <span>{item.title} <span style={{ color: 'var(--color-taupe)' }}>× {item.quantity}</span></span>
                  <span style={{ fontWeight: 500, fontFamily: 'var(--font-label)' }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div style={{ paddingTop: '1.5rem', borderTop: '1px solid rgba(201, 137, 122, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <span style={{ fontFamily: 'var(--font-label)', color: 'var(--color-plum)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-plum)', fontWeight: 600 }}>
                ₹{totalPrice.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading || items.length === 0}
              className="btn btn-primary"
              style={{ width: '100%', padding: '1.25rem', opacity: loading || items.length === 0 ? 0.7 : 1, cursor: loading || items.length === 0 ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Processing...' : `Pay ₹${totalPrice.toLocaleString('en-IN')} securely`}
            </button>
          </div>
        </div>

      </div>
    </form>
  );
}
