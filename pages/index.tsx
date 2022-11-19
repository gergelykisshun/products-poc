import type { NextPage } from "next";
import Head from "next/head";
import ProductCard from "../components/ProductCard/ProductCard";

const Home: NextPage = () => {
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
      <h1>See Products</h1>
      <div>
        <ProductCard />
      </div>
    </div>
  );
};

export default Home;
