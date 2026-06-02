'use client';

import { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct, getCategories } from '@/lib/api';
import ProductForm from '@/components/admin/ProductForm';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      setProducts(res.data || []);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddNew = () => {
    setCurrentProduct(null);
    setIsEditing(true);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      alert(err.message || 'Failed to delete product');
    }
  };

  const handleSubmit = async (formData) => {
    setFormLoading(true);
    try {
      if (currentProduct) {
        await updateProduct(currentProduct._id, formData);
      } else {
        await createProduct(formData);
      }
      setIsEditing(false);
      fetchProducts();
    } catch (err) {
      alert(err.message || 'Failed to save product');
    } finally {
      setFormLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            {currentProduct ? 'Edit Product' : 'New Product'}
          </h1>
        </div>
        <div className="card p-6 md:p-8">
          <ProductForm 
            initialData={currentProduct} 
            onSubmit={handleSubmit} 
            onCancel={() => setIsEditing(false)}
            isLoading={formLoading}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
          Products
        </h1>
        <button onClick={handleAddNew} className="btn btn-primary">
          + Add Product
        </button>
      </div>

      {loading ? (
        <p className="text-center py-10" style={{ color: 'var(--color-text-muted)' }}>Loading products...</p>
      ) : products.length === 0 ? (
        <div className="text-center py-20 card">
          <p className="mb-4" style={{ color: 'var(--color-text-muted)' }}>No products found.</p>
          <button onClick={handleAddNew} className="btn btn-primary">Create Your First Product</button>
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-accent-soft)', background: 'var(--color-bg)' }}>
                <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Image</th>
                <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Title</th>
                <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Price</th>
                <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Stock</th>
                <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Category</th>
                <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wider text-right" style={{ color: 'var(--color-text-muted)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="transition-colors hover:bg-yarniq-accent/10" style={{ borderBottom: '1px solid var(--color-accent-soft)' }}>
                  <td className="py-3 px-6">
                    <img src={product.imageUrl} alt={product.title} className="w-12 h-12 rounded-lg object-cover bg-yarniq-accent" />
                  </td>
                  <td className="py-3 px-6 font-medium" style={{ color: 'var(--color-text)' }}>{product.title}</td>
                  <td className="py-3 px-6 text-sm" style={{ color: 'var(--color-text-light)' }}>₹{product.price}</td>
                  <td className="py-3 px-6">
                    <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ 
                      background: product.stock > 0 ? 'rgba(109, 139, 116, 0.1)' : 'rgba(192, 108, 90, 0.1)',
                      color: product.stock > 0 ? 'var(--color-success)' : 'var(--color-error)'
                    }}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-sm" style={{ color: 'var(--color-text-light)' }}>{product.category}</td>
                  <td className="py-3 px-6 text-right">
                    <button onClick={() => handleEdit(product)} className="text-sm font-medium mr-4" style={{ color: 'var(--color-card)' }}>Edit</button>
                    <button onClick={() => handleDelete(product._id)} className="text-sm font-medium" style={{ color: 'var(--color-error)' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
