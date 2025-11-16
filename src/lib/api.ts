import type { Product } from '@/types/product';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8090';

class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: 'application/json',
    },
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
  getProducts: () => request<Product[]>('/api/products'),
  getProduct: (id: string) => request<Product>(`/api/products/${id}`),
  sendContact: (data: { name: string; email: string; message: string }) =>
    request<void>('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  register: (data: { email: string; password: string }) =>
    request<{ token: string }>('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  login: (data: { email: string; password: string }) =>
    request<{ token: string }>('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
};

export type { ApiError };


