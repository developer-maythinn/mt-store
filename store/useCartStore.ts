// store/useCartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, CartItem } from "@/types/ecommerce";

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  updateQuantity: (id: number, type: "inc" | "dec") => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product, quantity) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === product.id);
          const updatedCart = existing
            ? state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            : [...state.cart, { ...product, quantity }];
          return { cart: updatedCart };
        }),
      updateQuantity: (id, type) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: Math.max(
                    1,
                    item.quantity + (type === "inc" ? 1 : -1)
                  ),
                }
              : item
          ),
        })),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    { name: "shopping-cart" }
  )
);
