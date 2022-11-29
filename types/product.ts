import { Dispatch, SetStateAction } from "react";

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
  id: number;
  title: string;
  description: string;
  discountPercentage: number;
  price: number;
  thumbnail: string;
}

export interface IProductContext {
  productsCache: IProductCardData[];
  setProductsCache: Dispatch<SetStateAction<IProductCardData[]>>;
}
