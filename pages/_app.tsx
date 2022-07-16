import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import "../styles/globals.css";
import Layout from "@/components/layout";

function MyApp({ Component, pageProps }: AppProps) {
  TimeAgo.addDefaultLocale(en);
  TimeAgo.addLocale(ru);
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
