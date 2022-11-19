import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

type Props = {};

const ProductPage: NextPage<Props> = () => {
  const { productId } = useRouter().query as { productId: string };

  // GET PRODUCT
  useEffect(() => {}, []);

  return <div>ProductPage for {productId}</div>;
};

export default ProductPage;
