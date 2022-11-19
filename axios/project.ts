import { IProduct } from "../types/product";
import { limitQuery } from "./constants";
import { api } from "./init";

export const getProducts = async (): Promise<IProduct[]> => {
  const response = await api.get<IProduct[]>(`${limitQuery}`);
  return response.data;
};

export const getProductById = async (productId: string): Promise<IProduct> => {
  const response = await api.get<IProduct>(`/${productId}`);
  return response.data;
};
