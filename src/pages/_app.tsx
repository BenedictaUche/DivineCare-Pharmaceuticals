import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import HEAD from "next/head";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "../../context/CartContext";
import { AuthProvider } from "../../context/auth/AuthContext";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <HEAD>
        <title>Divine Care</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </HEAD>
      <NextTopLoader
        color="#29D"
        initialPosition={0.3}
        crawlSpeed={200}
        crawl={true}
        easing="ease"
        height={3}
        showSpinner={true}
        shadow="0 0 10px rgba(0, 0, 0, 0.3)"
      />
      <Toaster />
      <AuthProvider>
      <CartProvider>
        {getLayout(<Component {...pageProps} />)}
      </CartProvider>
      </AuthProvider>
    </>
  );
}
