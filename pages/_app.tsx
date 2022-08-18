import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import "../styles/globals.css";
import Layout from "@/components/layout";
import { Provider } from "react-redux";
import { store } from "store/store";

function MyApp({ Component, pageProps }: AppProps) {
  TimeAgo.addLocale(en);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
