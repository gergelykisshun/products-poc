import Link from "next/link";
import React, { FC } from "react";
import { IProductCardData } from "../../types/product";
import styles from "./ProductCard.module.scss";

type Props = {
  productData: IProductCardData;
};

const ProductCard: FC<Props> = ({ productData }) => {
  return (
    <div>
      <h2>{productData.title}</h2>
      <Link href={`/product/${productData.id}`}>See details</Link>
    </div>
  );
};

export default ProductCard;
