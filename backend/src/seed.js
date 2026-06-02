require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

// Use the exact same connection string we used to test the backend earlier
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/yarniq_test';

const dummyProducts = [
  {
    title: 'Cozy Amigurumi Bear',
    description: 'A beautifully handcrafted crochet amigurumi bear, made with 100% premium cotton yarn. Incredibly soft and perfect as a gift or a cozy addition to your room decor. Each stitch is made with love.',
    price: 1499,
    category: 'Amigurumi',
    materials: '100% Premium Cotton Yarn, Hypoallergenic stuffing',
    stock: 5,
    imageUrl: '/images/products/bear.png'
  },
  {
    title: 'Rustic Sunflower Bouquet',
    description: 'Brighten up any space with this everlasting crocheted sunflower bouquet! These gorgeous sunflowers are meticulously crafted to retain their shape and vibrant colors forever. Does not include vase.',
    price: 2100,
    category: 'Home Decor',
    materials: 'Acrylic blend yarn, wire stems',
    stock: 2,
    imageUrl: '/images/products/sunflowers.png'
  },
  {
    title: 'Vintage Granny Square Tote',
    description: 'A stylish, retro-inspired tote bag featuring a classic granny square pattern. Spacious enough for your daily essentials and sturdy enough to handle books and laptops. Lined with soft fabric inside.',
    price: 3200,
    category: 'Bags',
    materials: 'Cotton-Acrylic blend yarn, Cotton canvas lining',
    stock: 8,
    imageUrl: '/images/products/tote.png'
  },
  {
    title: 'Strawberry Bag Charm',
    description: 'Add a touch of whimsy to your favorite purse or backpack with this adorable crochet strawberry charm. Includes a sturdy silver clasp and a green leafy top.',
    price: 550,
    category: 'Accessories',
    materials: '100% Cotton Yarn, Metal lobster clasp',
    stock: 12,
    imageUrl: '/images/products/charm.png'
  }
];

const seedDB = async () => {
  try {
    console.log(`🔌 Connecting to MongoDB: ${MONGODB_URI}`);
    await mongoose.connect(MONGODB_URI);
    
    console.log('🗑️ Clearing existing products...');
    await Product.deleteMany({});
    
    console.log('🌱 Planting beautiful new crochet products...');
    await Product.insertMany(dummyProducts);
    
    console.log('✅ Success! Database has been seeded with stunning dummy data.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
