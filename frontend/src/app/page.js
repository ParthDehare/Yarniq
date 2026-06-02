'use client';

import { useEffect, useState } from 'react';
import HeroSection from '@/components/HeroSection';
import StorySection from '@/components/StorySection';
import PortfolioSection from '@/components/PortfolioSection';
import GallerySection from '@/components/GallerySection';
import CustomOrderSection from '@/components/CustomOrderSection';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import { useScrollReveal } from '@/lib/useScrollReveal';
import { getProducts, getCategories } from '@/lib/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);

  // Initialize scroll reveal hook
  useScrollReveal();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          getProducts(activeCategory),
          getCategories()
        ]);
        setProducts(productsRes.products || []);
        if (categories.length === 0) {
          const cats = Array.isArray(categoriesRes) ? categoriesRes : (categoriesRes?.categories || categoriesRes?.data || []);
          setCategories(cats);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [activeCategory]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      
      <HeroSection />
      
      <StorySection />

      {/* Creations / Products Section */}
      <section id="creations" className="section" style={{ background: 'var(--color-ivory)' }}>
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(3rem, 5vw, 56px)',
              color: 'var(--color-plum)',
              fontStyle: 'italic',
              marginBottom: '0.5rem'
            }}>Our Creations</h2>
            <p style={{ color: 'var(--color-taupe)', fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '1.1rem' }}>
              Handcrafted pieces available for immediate joy.
            </p>
          </div>

          <div className="reveal reveal-delay-1">
            <CategoryFilter 
              categories={categories} 
              activeCategory={activeCategory} 
              onSelectCategory={setActiveCategory} 
            />
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
              <div className="spinner" style={{ borderColor: 'var(--color-dusty-rose)', borderTopColor: 'transparent' }}></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center reveal" style={{ padding: '4rem 0' }}>
              <span style={{ fontSize: '3rem' }}>🧶</span>
              <h3 style={{ marginTop: '1rem', color: 'var(--color-plum)' }}>Check back soon!</h3>
              <p style={{ color: 'var(--color-taupe)' }}>We are currently busy crafting new items for this category.</p>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '2.5rem' 
            }}>
              {products.map((product, i) => (
                <div key={product._id} className="reveal" style={{ animationDelay: `${(i % 3) * 0.1}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <PortfolioSection />
      
      <GallerySection />
      
      <CustomOrderSection />

    </div>
  );
}
