export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
export const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

export const BRAND = {
  name: 'Yarniq',
  tagline: 'crafted by Prachee',
  description: 'A Parisian artisan studio meets a cozy Kyoto craft shop. Premium but personal. Handmade but polished. Every piece is crafted with care.',
};

export const NAV_LINKS = [
  { name: 'STORY', path: '/#story' },
  { name: 'CREATIONS', path: '/#creations' },
  { name: 'GALLERY', path: '/#gallery' },
  { name: 'CUSTOM ORDERS', path: '/#custom-orders' },
  { name: 'CONTACT', path: '/contact' },
];

export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
