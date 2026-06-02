import { Cormorant_Garamond, DM_Sans, Jost } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { CustomCursor } from '@/components/CustomCursor';
import DecorativeCorners from '@/components/DecorativeCorners';

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant'
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans'
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost'
});

export const metadata = {
  title: 'Yarniq | Premium Handcrafted Crochet',
  description: 'Handcrafted with yarn, made with love. Premium artisan crochet creations by Prachee.',
  openGraph: {
    title: 'Yarniq | Premium Handcrafted Crochet',
    description: 'Handcrafted with yarn, made with love. Premium artisan crochet creations by Prachee.',
    url: 'https://yarniq.vercel.app',
    siteName: 'Yarniq',
    images: [
      {
        url: '/images/hero/teddy.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${jost.variable}`}>
        <body>
          <DecorativeCorners />
          <CustomCursor />
          <Navbar />
          <CartDrawer />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
