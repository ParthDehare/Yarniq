'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';

export default function ProfilePage() {
  const { isLoaded, userId } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && userId) {
      const fetchOrders = async () => {
        try {
          // You might need to adjust the API URL based on your env setup
          const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
          const res = await fetch(`${baseUrl}/orders/my-orders/${userId}`);
          const data = await res.json();
          if (data.success) {
            setOrders(data.data);
          }
        } catch (err) {
          console.error('Failed to fetch orders:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    } else if (isLoaded && !userId) {
      setLoading(false);
    }
  }, [isLoaded, userId]);

  if (!isLoaded || loading) {
    return <div className="p-8 text-center" style={{ color: 'var(--color-text-muted)' }}>Loading profile...</div>;
  }

  if (!userId) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Profile</h1>
        <div className="card p-8 text-center">
          <p style={{ color: 'var(--color-text-muted)' }}>Please sign in to view your profile and order history.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl mb-8" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
        My Profile
      </h1>

      <div className="mb-10">
        <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
          Order History
        </h2>
        
        {orders.length === 0 ? (
          <div className="card p-8 text-center">
            <p style={{ color: 'var(--color-text-muted)' }}>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="card p-6 border" style={{ borderColor: 'var(--color-accent-soft)' }}>
                <div className="flex flex-wrap justify-between items-start mb-4 pb-4" style={{ borderBottom: '1px solid var(--color-accent-soft)' }}>
                  <div>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Order ID: {order._id}</p>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg" style={{ color: 'var(--color-text)' }}>₹{order.totalAmount}</p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ 
                        background: order.paymentStatus === 'PAID' ? 'rgba(109, 139, 116, 0.1)' : 'rgba(192, 108, 90, 0.1)',
                        color: order.paymentStatus === 'PAID' ? 'var(--color-success)' : 'var(--color-error)'
                      }}>
                        {order.paymentStatus}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ 
                        background: order.shippingStatus === 'SHIPPED' ? 'rgba(109, 139, 116, 0.1)' : 'rgba(212, 163, 115, 0.1)',
                        color: order.shippingStatus === 'SHIPPED' ? 'var(--color-success)' : 'var(--color-accent)'
                      }}>
                        {order.shippingStatus}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      {item.imageUrl && (
                        <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-cover rounded" />
                      )}
                      <div>
                        <p className="font-medium" style={{ color: 'var(--color-text)' }}>{item.title}</p>
                        <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>Qty: {item.quantity} × ₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
