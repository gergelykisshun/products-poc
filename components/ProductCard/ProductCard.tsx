import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { IProductCardData } from "../../interfaces/product";
import styles from "./ProductCard.module.scss";

type Props = {
  productData: IProductCardData;
};

const ProductCard: FC<Props> = ({ productData }) => {
  const productTitleArr = productData.title.split(" ");
  const productTextArr = productData.description.split(" ");

  return (
    <div className={`${styles["card-container"]}`}>
      <div>
        <div className={styles["image-container"]}>
          <Image
            src={productData.thumbnail}
            alt={productData.title}
            className={styles.image}
            loading="eager"
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            priority
            quality={100}
          />
          <p className={`${styles["corner-position"]} discount`}>
            {productData.discountPercentage}%
          </p>
        </div>

        <div className="flex items-center justify-between w-full">
          <p className="font-semibold text-xl">
            {productTitleArr.length < 2
              ? productData.title
              : productTitleArr.slice(0, 2).join(" ") + "..."}
          </p>
          <p className="font-semibold text-2xl">{productData.price} $</p>
        </div>
        <div className="w-9/12 self-start">
          <p>
            {productTextArr.length < 7
              ? productData.description
              : productTextArr.slice(0, 7).join(" ") + "..."}
          </p>
        </div>
      </div>

      <Link
        href={`/product/${productData.id}`}
        className="flex items-center justify-center rounded-3xl bg-black text-white w-full py-2 cursor-pointer"
      >
        See details
      </Link>
    </div>
  );
};

export default ProductCard;
