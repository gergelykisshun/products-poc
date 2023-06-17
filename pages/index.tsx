import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../axios/product";
import ProductCard from "../components/ProductCard/ProductCard";
import { IProductCardData } from "../interfaces/product";
import { toast } from "react-toastify";
import { useInView } from "react-intersection-observer";
import { useProductsStore } from "../store/productStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import { DEFAULT_LIMIT, SKIP_INCREASE } from "../axios/constants";

type Props = {
  initialProducts: IProductCardData[];
  initialTotal: number;
};

const Home: NextPage<Props> = ({ initialProducts, initialTotal }) => {
  // State
  const skip = useProductsStore((state) => state.skip);
  const increaseSkip = useProductsStore((state) => state.increaseSkip);

  const [total, setTotal] = useState<number>(initialTotal);

  // Hooks
  const {
    data: products,
    isError,
    fetchNextPage,
  } = useInfiniteQuery(["products"], () => getProducts(skip), {
    getNextPageParam: (_lastPage, _allPages) => {
      return true;
    },
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const { ref: reachedPageEndRef, inView: reachedPageEnd } = useInView();

  // Memo
  const amountOfProducts = useMemo<number>(
    () => (products?.pages.length || 0) + initialProducts.length,
    [products, initialProducts]
  );

  useEffect(() => {
    if (reachedPageEnd) {
      if (skip + DEFAULT_LIMIT < total) {
        increaseSkip();
        fetchNextPage();
      } else {
        toast.info("There are no more items available!");
      }
    }
  }, [reachedPageEnd]);

  useEffect(() => {
    if (products && products.pages.length && !isError) {
      setTotal(products.pages[products.pages.length - 1].total);
      // TODO runs when coming back
    }
  }, [products]);

  return (
    <div>
      <Head>
        <title>Products - POC</title>
      </Head>
      <h1 className="text-center py-9">See Products</h1>
      <>
        <div className="flex flex-col items-center">
          <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {amountOfProducts > 0 ? (
              [
                ...initialProducts,
                ...(products?.pages.map((page) => page.data).flat() || []),
              ].map((product) => (
                <div key={product.id} className="flex justify-center">
                  <ProductCard productData={product} />
                </div>
              ))
            ) : (
              <p>
                No products are available currently. Please come back later!
              </p>
            )}
          </main>
        </div>
        <div ref={reachedPageEndRef} className="h-1" />
      </>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data, total } = await getProducts();
    return {
      props: { initialProducts: data, initialTotal: total },
      revalidate: 60 * 30,
    };
  } catch (e) {
    console.log("Fetching products failed with cause:", e);
    return { props: { initialProducts: [], initialTotal: 0 } };
  }
};
