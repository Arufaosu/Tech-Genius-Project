// pages/_app.tsx
import "@/styles/global.css"; // Import global styles here
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

