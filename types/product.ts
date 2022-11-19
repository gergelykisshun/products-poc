export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface IProductCardData {
  title: string;
  description: string;
  discountPercentage: string;
  price: string;
  thumbnail: string;
}
