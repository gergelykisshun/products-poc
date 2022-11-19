import React, { FC } from "react";
import styles from "./ProductCard.module.scss";

type Props = {};

const ProductCard: FC<Props> = () => {
  return <div className={styles.test}>ProductCard</div>;
};

export default ProductCard;
