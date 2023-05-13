import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import React from "react";
import { getProductById, preFetchAllProducts } from "../../axios/product";
import { IProduct } from "../../types/product";
import { toast } from "react-toastify";

import Star from "../../svg/Star";
import EmptyStar from "../../svg/EmptyStar";
import styles from "./productPage.module.scss";
import Head from "next/head";

type Props = {
  product: IProduct;
};

const ProductPage: NextPage<Props> = ({ product }) => {
  return (
    <div className="min-h-screen flex items-center">
      <Head>
        <title>{product.title}</title>
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 px-5 lg:px-20">
        <div className="col-span-2">
          <Swiper
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className="esport-swiper"
          >
            {product.images.map((image) => (
              <SwiperSlide key={image}>
                <div className={styles.image}>
                  <Image
                    src={image}
                    alt={product.title}
                    loading="eager"
                    fill
                    sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                    quality={100}
                    className="p-7 object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="col-span-2 flex flex-col justify-center space-y-3">
          <div className="space-y-2 lg:flex lg:justify-between">
            <p className="font-semibold text-5xl">{product.title}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((starNbr, i) => {
                  if (starNbr <= product.rating) {
                    return <Star key={i} />;
                  }
                  return <EmptyStar key={i} />;
                })}
                <p>{product.rating}</p>
              </div>
            </div>
          </div>

          <p className="w-10/12 font-medium text-2xl">{product.description}</p>

          <div className={`${styles.info} space-y-1`}>
            <p>Stock: {product.stock}</p>
            <p>Brand: {product.brand}</p>
            <p>Category: {product.category}</p>
          </div>

          <p className="discount">{product.discountPercentage}%</p>

          <div className="flex items-center justify-between">
            <p className="font-semibold text-4xl lg:text-6xl">
              {product.price} $
            </p>
            <button
              onClick={() => {
                toast.info(`You added ${product.title} to your cart!`);
                setTimeout(() => router.push("/"), 1500);
              }}
              className="font-semibold text-2xl text-white bg-black rounded-full px-8 py-3"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await preFetchAllProducts();

  const paths: { params: { id: string } }[] = products.map((product) => ({
    params: { id: String(product.id) },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { id } = context.params as { id: string };

  try {
    const product: IProduct = await getProductById(id);
    return {
      props: { product },
    };
  } catch (e) {
    return { notFound: true };
  }
};
