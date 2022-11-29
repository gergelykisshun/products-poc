import { useState, useContext, createContext, FC, ReactNode } from "react";
import { IProductCardData, IProductContext } from "../types/product";

const productContext = createContext<IProductContext>({} as IProductContext);

export const useProducts = () => {
  return useContext(productContext).productsCache;
};

export const useUpdateProducts = () => {
  return useContext(productContext).setProductsCache;
};

type Props = {
  children: ReactNode;
};

const ProductContextProvider: FC<Props> = ({ children }) => {
  const [productsCache, setProductsCache] = useState<IProductCardData[]>([]);

  return (
    <productContext.Provider value={{ productsCache, setProductsCache }}>
      {children}
    </productContext.Provider>
  );
};

export default ProductContextProvider;
