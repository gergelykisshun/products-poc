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
      <h1>See Products</h1>

      {loading ? (
        <LoadingSpinner />
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} productData={product} />
        ))
      )}
    </div>
  );
};

export default Home;
