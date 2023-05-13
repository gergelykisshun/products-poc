import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import { getProducts } from "../axios/product";
import ProductCard from "../components/ProductCard/ProductCard";
import { IProductCardData } from "../types/product";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { useInView } from "react-intersection-observer";

type Props = {
  initialProducts: IProductCardData[];
  initialTotal: number;
};

const Home: NextPage<Props> = ({ initialProducts, initialTotal }) => {
  const [products, setProducts] = useState<IProductCardData[]>(initialProducts);
  const [total, setTotal] = useState<number>(initialTotal);

  const [skip, setSkip] = useState<number>(0);
  const [isFetchingNewItems, setIsFetchingNewItems] = useState<boolean>(false);

  const { ref: reachedPageEndRef, inView: reachedPageEnd } = useInView();

  const fetchProducts = useCallback(
    async (skip: number) => {
      try {
        const products = await getProducts(skip);
        setProducts((prev) => [...prev, ...products.data]);
        setTotal(products.total);
        toast.success("Products loaded!");
      } catch (e) {
        toast.error("Something went wrong! Please try again!");
      }
    },
    [skip]
  );

  useEffect(() => {
    if (reachedPageEnd) {
      startFetchingNewItems();
    }
  }, [reachedPageEnd]);

  useEffect(() => {
    if (isFetchingNewItems) {
      fetchProducts(skip);
    }
    setIsFetchingNewItems(false);
  }, [isFetchingNewItems]);

  const startFetchingNewItems = () => {
    if (products.length < total) {
      setSkip((prev) => prev + 10);
      setIsFetchingNewItems(true);
    } else {
      toast.info("There are no more items available!");
    }
  };

  return (
    <div>
      <Head>
        <title>Products - POC</title>
      </Head>
      <h1 className="text-center py-9">See Products</h1>
      <>
        <div className="flex flex-col items-center">
          <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.length > 0 ? (
              products.map((product) => (
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
          {isFetchingNewItems && <LoadingSpinner isFullscreen />}
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
