import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import type { Product } from '@/types/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  changeQty: (productId: string, quantity: number) => void;
  clear: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'siberia_roots_cart_v1';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const changeQty = (productId: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.product.id === productId ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const clear = () => setItems([]);

  const { totalItems, totalPrice } = useMemo(() => {
    let ti = 0;
    let tp = 0;
    for (const i of items) {
      ti += i.quantity;
      tp += i.quantity * i.product.price;
    }
    return { totalItems: ti, totalPrice: tp };
  }, [items]);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, changeQty, clear, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}


