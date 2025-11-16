import type { Product } from '@/types/product';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8090';

const DEFAULT_HEADERS = {
  Accept: 'application/json',
} as const;

const JSON_HEADERS = {
  'Content-Type': 'application/json',
} as const;

class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit, token?: string | null): Promise<T> {
  const headers: HeadersInit = {
    ...DEFAULT_HEADERS,
    ...init?.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers,
    ...init,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new ApiError(response.status, text || response.statusText);
  }

  // Handle empty responses (204 No Content, 202 Accepted)
  const contentType = response.headers.get('content-type');
  if (response.status === 204 || response.status === 202 || !contentType?.includes('application/json')) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const api = {
  getProducts: (filters?: { category?: string; minPrice?: number; maxPrice?: number }, token?: string | null) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.minPrice != null) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice != null) params.append('maxPrice', filters.maxPrice.toString());
    const query = params.toString();
    return request<Product[]>(`/api/products${query ? '?' + query : ''}`, undefined, token);
  },
  getProduct: (id: string) => request<Product>(`/api/products/${id}`),
  sendContact: (data: { name: string; email: string; message: string }) =>
    request<void>('/api/contact', {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify(data),
    }),
  register: (data: { email: string; password: string }) =>
    request<{ token: string }>('/api/auth/register', {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify(data),
    }),
  login: (data: { email: string; password: string }) =>
    request<{ token: string }>('/api/auth/login', {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify(data),
    }),
  createOrder: (data: {
    items: Array<{ productId: string; quantity: number }>;
    shippingName: string;
    shippingEmail: string;
    shippingAddress: string;
    shippingCity: string;
    shippingZip: string;
  }, token: string) =>
    request<OrderResponse>('/api/orders', {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify(data),
    }, token),
  getUserOrders: (token: string) =>
    request<OrderResponse[]>('/api/orders', undefined, token),
  getOrder: (id: string, token: string) =>
    request<OrderResponse>(`/api/orders/${id}`, undefined, token),
};

export interface OrderResponse {
  id: string;
  items: Array<{
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }>;
  shippingName: string;
  shippingEmail: string;
  shippingAddress: string;
  shippingCity: string;
  shippingZip: string;
  total: number;
  status: string;
  createdAt: string;
}

export type { ApiError };


