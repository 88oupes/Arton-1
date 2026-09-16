export interface Product {
  id: string;
  name: string;
  badge?: string;
  badgeColor?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  features: string[];
  firmness: 'Moelleux' | 'Équilibré' | 'Ferme' | 'Très ferme';
  thickness: string;
  composition: string;
  sizes: {
    size: string;
    price: number;
  }[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
  unitPrice: number;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  productBought: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}
