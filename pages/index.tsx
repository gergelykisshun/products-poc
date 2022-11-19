import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getProducts } from "../axios/product";
import ProductCard from "../components/ProductCard/ProductCard";
import { IProductCardData } from "../types/product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const Home: NextPage = () => {
  const [products, setProducts] = useState<IProductCardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    try {
      const products = await getProducts();
      setProducts(products);
      setLoading(false);
      toast.success("Products loaded!");
    } catch (e) {
      setLoading(false);
      toast.error("Something went wrong! Please try again!");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@500,600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ToastContainer
        position="top-right"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        theme="dark"
      />
      <h1 className="text-center">See Products</h1>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mx-auto" style={{ width: 1440 }}>
          <main className="grid grid-cols-4 gap-2">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} productData={product} />
              ))
            ) : (
              <p>
                No products are available currently. Please come back later!
              </p>
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default Home;
