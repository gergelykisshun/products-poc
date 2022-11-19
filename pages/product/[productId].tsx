import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { getProductById } from "../../axios/product";
import { IProduct } from "../../types/product";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

type Props = {};

const ProductPage: NextPage<Props> = () => {
  const router = useRouter();
  const { productId } = useRouter().query as { productId: string };
  const [product, setProduct] = useState<IProduct>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = useCallback(async () => {
    if (productId) {
      try {
        const product = await getProductById(productId);
        setProduct(product);
        setLoading(false);
        toast.success("Products loaded!");
      } catch (e) {
        console.log(productId);
        router.push("/");
        toast.error("Something went wrong! Please try again!");
      }
    }
  }, [productId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div>
      <h3>{product?.title}</h3>
    </div>
  );
};

export default ProductPage;
