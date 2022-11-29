import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductContextProvider from "../contexts/ProductContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ProductContextProvider>
        <ToastContainer
          position="top-right"
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          theme="dark"
        />

        <Component {...pageProps} />
      </ProductContextProvider>
    </>
  );
}

export default MyApp;
