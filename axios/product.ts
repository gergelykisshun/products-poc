import { IProduct, IProductCardData } from "../types/product";
import { limitQuery } from "./constants";
import { api } from "./init";

export const getProducts = async (
  skip: number
): Promise<{ data: IProductCardData[]; total: number }> => {
  const response = await api.get(`${limitQuery}&skip=${skip}`);

  const products: IProduct[] = response.data.products;

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
