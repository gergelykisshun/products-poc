import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer
        position="top-right"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        theme="dark"
      />
      <div className="mx-auto" style={{ width: 1440 }}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
