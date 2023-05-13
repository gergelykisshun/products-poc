import { IGenericApiResponse } from "../interfaces/generic";
import { IProduct, IProductCardData } from "../types/product";
import { LIMIT, SKIP } from "./constants";
import { api } from "./init";

export const getProducts = async (
  skip: number = SKIP,
  limit: number = LIMIT
): Promise<{ data: IProductCardData[]; total: number }> => {
  const response = await api.get<IGenericApiResponse<IProduct>>(
    `?limit=${limit}&skip=${skip}`
  );

  const products = response.data.products;

  return {
    data: products.map((product) => ({
      id: product.id,
      description: product.description,
      discountPercentage: product.discountPercentage,
      price: product.price,
      thumbnail: product.thumbnail,
      title: product.title,
    })),
    total: response.data.total,
  };
};

export const getProductById = async (productId: string): Promise<IProduct> => {
  const response = await api.get<IProduct>(`/${productId}`);
  return response.data;
};
