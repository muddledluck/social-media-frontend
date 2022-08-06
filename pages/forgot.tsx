import Forgot from "@/components/auth/forgot/forgot";
import type { NextPage } from "next";
import Head from "next/head";
const Forget: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Forgot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Forgot />
      </main>
    </div>
  );
};

export default Forget;
