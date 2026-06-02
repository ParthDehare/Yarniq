'use client';

import { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus } from '@/lib/api';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getOrders();
      setOrders(res.data || []);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      // Update local state without refetching to be snappy
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, shippingStatus: newStatus } : order
        )
      );
    } catch (err) {
      alert(err.message || 'Failed to update status');
      fetchOrders(); // Revert on fail
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
      case 'PROCESSING':
        return { bg: 'rgba(230, 162, 60, 0.1)', text: '#e6a23c' }; // Warning orange
      case 'PAID':
      case 'SHIPPED':
        return { bg: 'rgba(64, 158, 255, 0.1)', text: '#409eff' }; // Info blue
      case 'DELIVERED':
        return { bg: 'rgba(103, 194, 58, 0.1)', text: '#67c23a' }; // Success green
      default:
        return { bg: 'rgba(144, 147, 153, 0.1)', text: '#909399' }; // Gray
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
          Orders
        </h1>
        <button onClick={fetchOrders} className="btn btn-outline btn-pill text-sm px-4 py-2">
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-center py-10" style={{ color: 'var(--color-text-muted)' }}>Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 card">
          <p className="text-lg" style={{ color: 'var(--color-text-muted)' }}>No orders yet.</p>
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-accent-soft)', background: 'var(--color-bg)' }}>
                <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Order ID</th>
                <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Customer</th>
                <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Amount</th>
                <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Payment</th>
                <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Items</th>
                <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Shipping Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const paymentColors = getStatusColor(order.paymentStatus);
                const shippingColors = getStatusColor(order.shippingStatus);

                return (
                  <tr key={order._id} className="transition-colors hover:bg-yarniq-accent/10" style={{ borderBottom: '1px solid var(--color-accent-soft)' }}>
                    <td className="py-4 px-6 font-mono text-xs" style={{ color: 'var(--color-text-light)' }}>
                      {order._id.slice(-6)}
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-sm" style={{ color: 'var(--color-text)' }}>{order.customerName}</p>
                      <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{order.customerEmail}</p>
                    </td>
                    <td className="py-4 px-6 font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
                      ₹{order.totalAmount?.toLocaleString('en-IN')}
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs px-2 py-1 rounded-full font-medium uppercase tracking-wider" style={{ 
                        background: paymentColors.bg, color: paymentColors.text
                      }}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="w-8 h-8 rounded-full border-2 overflow-hidden bg-yarniq-accent flex items-center justify-center text-xs"
                               style={{ borderColor: 'var(--color-white)' }} title={item.title}>
                            {item.imageUrl ? <img src={item.imageUrl} alt="item" className="w-full h-full object-cover" /> : '🧶'}
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="w-8 h-8 rounded-full border-2 bg-gray-100 flex items-center justify-center text-[10px] font-bold z-10"
                               style={{ borderColor: 'var(--color-white)', color: 'var(--color-text)' }}>
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {updatingId === order._id ? (
                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Updating...</span>
                      ) : (
                        <select
                          value={order.shippingStatus}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="text-xs font-semibold px-2 py-1.5 rounded-lg border outline-none cursor-pointer uppercase tracking-wider"
                          style={{
                            background: shippingColors.bg,
                            color: shippingColors.text,
                            borderColor: 'transparent'
                          }}
                        >
                          <option value="PROCESSING">PROCESSING</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="DELIVERED">DELIVERED</option>
                        </select>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
