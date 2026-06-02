const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Fetch helper with error handling
 */
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  const res = await fetch(url, config);

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || `API Error: ${res.status}`);
  }

  return res.json();
}

// ─── Product API ────────────────────────────────────

export async function getProducts(category = '') {
  const query = category ? `?category=${encodeURIComponent(category)}` : '';
  return fetchAPI(`/api/products${query}`);
}

export async function getProductById(id) {
  return fetchAPI(`/api/products/${id}`);
}

export async function getCategories() {
  return fetchAPI('/api/products/categories');
}

// ─── Checkout API ───────────────────────────────────

export async function createOrder(orderData) {
  return fetchAPI('/api/checkout/create-order', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
}

export async function verifyPayment(paymentData) {
  return fetchAPI('/api/checkout/verify-payment', {
    method: 'POST',
    body: JSON.stringify(paymentData),
  });
}

// ─── Contact API ────────────────────────────────────

export async function sendContactMessage(formData) {
  return fetchAPI('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}

// ─── Admin API ──────────────────────────────────────

export async function createProduct(productData) {
  return fetchAPI('/api/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  });
}

export async function updateProduct(id, productData) {
  return fetchAPI(`/api/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  });
}

export async function deleteProduct(id) {
  return fetchAPI(`/api/products/${id}`, {
    method: 'DELETE',
  });
}

export async function getOrders() {
  return fetchAPI('/api/orders');
}

export async function updateOrderStatus(id, statusData) {
  return fetchAPI(`/api/orders/${id}`, {
    method: 'PUT',
    body: JSON.stringify(statusData),
  });
}
