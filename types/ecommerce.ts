// types/ecommerce.ts
export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CategoryType {
  name: string;
  slug: string;
};

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}