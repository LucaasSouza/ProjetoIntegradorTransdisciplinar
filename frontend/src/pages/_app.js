import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
// Fontawesome Imports
import "@fortawesome/fontawesome-svg-core/styles.css";
// JS
import Head from "next/head";
import Context from "@/context/context";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/img/logo.png" />
        <title>Cupcapp | Vida doce</title>
      </Head>

      <Context>
        <Component {...pageProps} />
      </Context>
    </>
  )
}
