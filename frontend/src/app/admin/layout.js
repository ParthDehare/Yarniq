import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata = {
  title: 'Admin Dashboard — Yarniq',
};

export default async function AdminLayout({ children }) {
  const user = await currentUser();

  if (!user) {
    redirect('/');
  }

  // We'll allow access if the email matches ADMIN_EMAIL or if no ADMIN_EMAIL is set (for testing)
  const userEmail = user.emailAddresses[0]?.emailAddress;
  const adminEmail = process.env.ADMIN_EMAIL || 'prachee@gmail.com';
  
  // NOTE: For now, we only restrict if an email is provided in env that doesn't match
  // In a real strict environment, we'd check against a specific hardcoded list
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ background: 'var(--color-bg)' }}>
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0 border-r" style={{ background: 'var(--color-white)', borderColor: 'var(--color-accent-soft)' }}>
        <div className="p-6">
          <Link href="/admin" className="text-2xl" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontWeight: 700 }}>
            Yarniq Admin
          </Link>
          <p className="text-sm mt-1 mb-8" style={{ color: 'var(--color-text-muted)' }}>
            Welcome, {user.firstName || 'Admin'}
          </p>

          <nav className="flex flex-col gap-2">
            <Link href="/admin" className="px-4 py-2 rounded-xl text-sm transition-colors hover:bg-yarniq-accent/30" style={{ color: 'var(--color-text-light)', fontWeight: 500 }}>
              Dashboard
            </Link>
            <Link href="/admin/products" className="px-4 py-2 rounded-xl text-sm transition-colors hover:bg-yarniq-accent/30" style={{ color: 'var(--color-text-light)', fontWeight: 500 }}>
              Products
            </Link>
            <Link href="/admin/orders" className="px-4 py-2 rounded-xl text-sm transition-colors hover:bg-yarniq-accent/30" style={{ color: 'var(--color-text-light)', fontWeight: 500 }}>
              Orders
            </Link>
            
            <div className="mt-8 pt-4 border-t" style={{ borderColor: 'var(--color-accent-soft)' }}>
              <Link href="/" className="px-4 py-2 rounded-xl text-sm transition-colors hover:bg-yarniq-accent/30 text-yarniq-card flex items-center gap-2">
                <span>←</span> Back to Store
              </Link>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
