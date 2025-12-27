

import { Product, ProductResponse } from "@/types/ecommerce";

const BASE_URL = "https://dummyjson.com";

export const api = {
  getCategories: async (): Promise<string[]> => {
    const res = await fetch(`${BASE_URL}/products/category-list`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  },

  getProductsByCategory: async (category: string): Promise<ProductResponse> => {
    if (!category) throw new Error("Category is required");

    const res = await fetch(`${BASE_URL}/products/category/${category}`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },
 
  getProductById: async (id: string): Promise<Product> => {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error("Product not found");
    return res.json();
  },
};
