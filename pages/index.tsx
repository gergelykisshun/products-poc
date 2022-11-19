import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getProducts } from "../axios/product";
import ProductCard from "../components/ProductCard/ProductCard";
import { IProductCardData } from "../types/product";
import { toast } from "react-toastify";
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
        <title>Products - POC</title>
      </Head>
      <h1 className="text-center py-9">See Products</h1>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mx-auto" style={{ width: 1440 }}>
          <main className="grid grid-cols-4 gap-y-6">
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
        </div>
      )}
    </div>
  );
};

export default Home;
