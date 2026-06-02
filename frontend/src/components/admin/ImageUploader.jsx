'use client';

import { useState } from 'react';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '@/lib/constants';

export default function ImageUploader({ onUploadSuccess, currentImage }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      setError('Cloudinary is not configured in .env.local');
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        onUploadSuccess(data.secure_url);
      } else {
        throw new Error(data.error?.message || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload Error:', err);
      setError(err.message || 'Image upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      <div 
        className="relative border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-colors hover:bg-yarniq-accent/10"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          disabled={uploading}
        />
        
        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <svg className="animate-spin h-8 w-8" style={{ color: 'var(--color-card)' }} viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>Uploading...</p>
          </div>
        ) : currentImage ? (
          <div className="flex flex-col items-center gap-3 z-20">
            <img src={currentImage} alt="Preview" className="h-32 object-contain rounded-xl" />
            <p className="text-sm text-yarniq-card underline cursor-pointer pointer-events-none">
              Click or drag to change image
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 z-20">
            <span className="text-4xl opacity-50">📸</span>
            <p className="text-sm" style={{ color: 'var(--color-text)' }}>
              <span className="font-semibold text-yarniq-card">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              PNG, JPG, WEBP up to 5MB
            </p>
          </div>
        )}
      </div>
      
      {error && <p className="text-xs mt-2" style={{ color: 'var(--color-error)' }}>{error}</p>}
    </div>
  );
}
