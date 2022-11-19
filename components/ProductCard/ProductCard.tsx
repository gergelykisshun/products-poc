import React, { FC } from "react";
import { IProductCardData } from "../../types/product";
import styles from "./ProductCard.module.scss";

const ProductCard: FC<IProductCardData> = ({
  description,
  discountPercentage,
  price,
  thumbnail,
  title,
}) => {
  return <div className={styles.test}>ProductCard</div>;
};

export default ProductCard;
