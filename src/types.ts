export type CategoryId = 'matelas' | 'linge' | 'lit' | 'salon' | 'oreiller' | 'accessoires';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  itemCountText: string;
  highlights: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  categoryName: string;
  badge?: string;
  badgeColor?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  additionalImages?: string[];
  description: string;
  features: string[];
  firmness?: 'Moelleux' | 'Équilibré' | 'Ferme' | 'Très ferme';
  thickness?: string;
  composition: string;
  sizes: {
    size: string;
    price: number;
  }[];
  inStock?: boolean;
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

