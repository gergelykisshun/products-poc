import { IGenericApiResponse } from "../interfaces/generic";
import { IProduct, IProductCardData } from "../interfaces/product";
import { DEFAULT_LIMIT, DEFAULT_SKIP } from "./constants";
import { api } from "./init";

export const getProducts = async (
  skip: number = DEFAULT_SKIP,
  limit: number = DEFAULT_LIMIT
): Promise<{ data: IProductCardData[]; total: number }> => {
  const response = await api.get<IGenericApiResponse<IProduct>>("", {
    params: { limit, skip },
  });

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

export const preFetchAllProducts = async (): Promise<IProduct[]> => {
  let products: IProduct[] = [];
  try {
    const response = await api.get<IGenericApiResponse<IProduct>>("", {
      params: { limit: 100 },
    });
    products = response.data.products;

    if (response.data.total > 100) {
      const res = await api.get<IGenericApiResponse<IProduct>>("", {
        params: { skip: 100, limit: response.data.total - 100 },
      });
      products = [...products, ...res.data.products];
    }
  } catch (e) {
    console.log("Fetching all products failed with cause:", e);
  } finally {
    return products;
  }
};
