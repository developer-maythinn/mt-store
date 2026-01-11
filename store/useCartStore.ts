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
          // Check if this product is already in the cart
          const existingItem = state.cart.find(
            (item) => item.id === product.id
          );

          // If product already exists, update its quantity
          if (existingItem) {
            const updatedCart = state.cart.map((item) => {
              if (item.id === product.id) {
                return {
                  ...item,
                  quantity: item.quantity + quantity,
                };
              }
              return item;
            });
            return { cart: updatedCart };
          }

          // If product is new, add it to the cart
          const newCartItem = { ...product, quantity };
          return { cart: [...state.cart, newCartItem] };
        }),
      updateQuantity: (id, type) =>
        set((state) => ({
          cart: state.cart.map((item) => {
            if (item.id !== id) return item;

            const newQuantity =
              type === "inc" ? item.quantity + 1 : item.quantity - 1;

            return {
              ...item,
              quantity: Math.max(1, newQuantity),
            };
          }),
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
