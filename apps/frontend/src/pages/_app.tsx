import "@/styles/globals.css";
import { theme } from "@/theme";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import { NavBar } from "../components/NavBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Online Job Fair Registration</title>
          <meta name="description" content="Online Job Fair Registration" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBar isLogin={false} />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
