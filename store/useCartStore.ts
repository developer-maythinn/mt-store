// store/useCartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from '@/types/ecommerce';

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  updateQuantity: (id: number, type: 'inc' | 'dec') => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product, quantity) => set((state) => {
        const existing = state.cart.find((item) => item.id === product.id);
        if (existing) {
          return {
            cart: state.cart.map((item) =>
              item.id === product.id 
                ? { ...item, quantity: item.quantity + quantity } 
                : item
            ),
          };
        }
        return { cart: [...state.cart, { ...product, quantity }] };
      }),
      updateQuantity: (id, type) => set((state) => ({
        cart: state.cart.map((item) => {
          if (item.id === id) {
            const newQty = type === 'inc' ? item.quantity + 1 : item.quantity - 1;
            return { ...item, quantity: Math.max(1, newQty) };
          }
          return item;
        }),
      })),
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== id)
      })),
      clearCart: () => set({ cart: [] }),
    }),
    { name: 'shopping-cart' }
  )
);