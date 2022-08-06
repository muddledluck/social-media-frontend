import type { NextPage } from "next";
import Head from "next/head";
import { PROJECT_TITLE } from "@/utils/constant";
import HomePage from "@/components/home";
import { withLoginRedirect } from "@/HOC/withAuth";
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>{PROJECT_TITLE}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HomePage />
      </main>
    </div>
  );
};
export default withLoginRedirect(Home);
