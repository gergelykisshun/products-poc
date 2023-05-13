import { create } from "zustand";
import { IProductCardData } from "../interfaces/product";

interface State {
  cachedProducts: IProductCardData[];
}

interface Actions {
  addProductsToCache: (products: IProductCardData[]) => void;
  reset: () => void;
}

const initialState: State = {
  cachedProducts: [],
};

export const useProductsStore = create<State & Actions>()((set) => ({
  ...initialState,
  addProductsToCache: (newProducts) =>
    set((state) => ({
      cachedProducts: [...state.cachedProducts, ...newProducts],
    })),
  reset: () => set(initialState),
}));
