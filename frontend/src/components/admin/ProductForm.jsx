'use client';

import { useState } from 'react';
import ImageUploader from './ImageUploader';

export default function ProductForm({ initialData, onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      price: '',
      category: '',
      description: '',
      materials: '',
      stock: '1',
      imageUrl: '',
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (url) => {
    setFormData((prev) => ({ ...prev, imageUrl: url }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
      <div>
        <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-light)' }}>
          Product Image *
        </label>
        <ImageUploader 
          currentImage={formData.imageUrl} 
          onUploadSuccess={handleImageUpload} 
        />
        {!formData.imageUrl && (
           <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Required</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-light)' }}>
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-light)' }}>
            Price (₹) *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="input"
            min="0"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-light)' }}>
            Category *
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Amigurumi, Bag Charm"
            className="input"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-light)' }}>
            Stock Quantity *
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="input"
            min="0"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-light)' }}>
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="input"
          rows={4}
          required
          style={{ resize: 'vertical' }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-light)' }}>
          Materials (Optional)
        </label>
        <input
          type="text"
          name="materials"
          value={formData.materials}
          onChange={handleChange}
          placeholder="e.g. 100% Cotton Yarn, Safety Eyes"
          className="input"
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-outline flex-1"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary flex-1"
          disabled={isLoading || !formData.imageUrl}
          style={{ opacity: isLoading || !formData.imageUrl ? 0.7 : 1 }}
        >
          {isLoading ? 'Saving...' : initialData ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
}
