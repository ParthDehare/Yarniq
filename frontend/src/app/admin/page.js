'use client';

import { useEffect, useState } from 'react';
import { getOrders } from '@/lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getOrders();
        const orders = res.data || [];
        
        const totalRevenue = orders.reduce((sum, order) => sum + (order.paymentStatus === 'PAID' ? order.totalAmount : 0), 0);
        const pendingOrders = orders.filter(o => o.shippingStatus === 'PROCESSING').length;

        setStats({
          totalOrders: orders.length,
          totalRevenue,
          pendingOrders,
        });
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl mb-8" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="card p-6">
          <p className="text-sm uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>Total Revenue</p>
          <h2 className="text-3xl font-bold" style={{ color: 'var(--color-card)' }}>
            ₹{stats.totalRevenue.toLocaleString('en-IN')}
          </h2>
        </div>
        
        <div className="card p-6">
          <p className="text-sm uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>Total Orders</p>
          <h2 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>
            {stats.totalOrders}
          </h2>
        </div>

        <div className="card p-6">
          <p className="text-sm uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>Pending Shipments</p>
          <h2 className="text-3xl font-bold" style={{ color: stats.pendingOrders > 0 ? 'var(--color-error)' : 'var(--color-success)' }}>
            {stats.pendingOrders}
          </h2>
        </div>
      </div>
    </div>
  );
}
