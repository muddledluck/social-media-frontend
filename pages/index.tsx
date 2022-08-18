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
      <main style={{width:"100%"}}>
        <HomePage />
      </main>
    </div>
  );
};
export default withLoginRedirect(Home);
