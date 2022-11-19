import axios from "axios";

const apiParams = {
  baseURL: `https://dummyjson.com/products`,
  timeout: 20000,
};

export const api = axios.create(apiParams);
