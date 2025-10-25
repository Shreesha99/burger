import "@styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Component {...pageProps} />
    </>
  );
}
