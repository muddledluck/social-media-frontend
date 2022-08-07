import type { NextPage } from "next";
import Head from "next/head";
import { PROJECT_TITLE } from "@/utils/constant";
import { useEffect } from "react";
import { clearLocalStorage } from "@/helpers/persistStorageHelper";
import { useRouter } from "next/router";
const Logout: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    clearLocalStorage();
    router.push("/sign-in");
  }, [router]);
  return (
    <div>
      <Head>
        <title>PROJECT_TITLE </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>Logging out...</div>
      </main>
    </div>
  );
};
export default Logout;
