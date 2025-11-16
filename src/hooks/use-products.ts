import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Product } from '@/types/product';
import { useAuth } from '@/contexts/AuthContext';

const PRODUCTS_QUERY_KEY = ['products'];

export const useProducts = (filters?: { category?: string; minPrice?: number; maxPrice?: number }) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, filters],
    queryFn: () => api.getProducts(filters, token),
    staleTime: 1000 * 60 * 5,
  });
};

export const useProduct = (id: string | undefined) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, id],
    queryFn: () => api.getProduct(id!),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
    initialData: () => {
      const products = queryClient.getQueryData<Product[]>(PRODUCTS_QUERY_KEY);
      return products?.find((product) => product.id === id);
    },
  });
};


