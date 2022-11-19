import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { IProductCardData } from "../../types/product";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import styles from "./ProductCard.module.scss";

type Props = {
  productData: IProductCardData;
};

const ProductCard: FC<Props> = ({ productData }) => {
  return (
    <div className={`${styles["card-container"]}`}>
      <div className={styles["image-container"]}>
        <Image
          src={productData.thumbnail}
          alt={productData.title}
          className={styles.image}
          loading="eager"
          fill
          quality={100}
        />
        <p className={styles.discount}>{productData.discountPercentage}%</p>
      </div>
      <h2>{productData.title}</h2>
      <Link href={`/product/${productData.id}`}>See details</Link>
    </div>
  );
};

export default ProductCard;
