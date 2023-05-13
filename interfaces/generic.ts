export interface IGenericApiResponse<T> {
  products: T[];
  total: number;
  skip: number;
  limit: number;
}

export interface IGenericApiQuery {
  page?: number;
  pagesize?: number;

  todate?: number;
  fromdate?: number;

  max?: number;
  min?: number;

  order?: "desc" | "asc";
}

export interface IGenericData<T> {
  data: T[];
  has_more: boolean;
}
