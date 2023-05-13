import { create } from "zustand";
import { IProductCardData } from "../interfaces/product";
import { SKIP_INCREASE } from "../axios/constants";

interface State {
  cachedProducts: IProductCardData[];
  skip: number;
}

interface Actions {
  addProductsToCache: (products: IProductCardData[]) => void;
  increaseSkip: () => void;
  reset: () => void;
}

const initialState: State = {
  cachedProducts: [],
  skip: SKIP_INCREASE,
};

export const useProductsStore = create<State & Actions>()((set) => ({
  ...initialState,
  addProductsToCache: (newProducts) =>
    set((state) => ({
      cachedProducts: [...state.cachedProducts, ...newProducts],
    })),
  reset: () => set(initialState),
  increaseSkip: () => {
    set((state) => ({ skip: state.skip + SKIP_INCREASE }));
  },
}));
