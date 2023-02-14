import type { AppProps } from "next/app";
import Head from "next/head";

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "@/styles/globals.css";

import "react-toastify/dist/ReactToastify.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>Authentification - Giorgi Makharadze</title>
      </Head>
      <SessionProvider session={session}>
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <ToastContainer />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
