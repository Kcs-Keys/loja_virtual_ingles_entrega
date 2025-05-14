export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  categoryId: number;
  discount?: number;
  featured?: boolean;
  inStock: boolean;
  rating: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}