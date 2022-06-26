import type { NextPage } from "next";
import Head from "next/head";
import LoginForm from "@/components/auth";
import Navbar from "@/components/navbar";
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Login Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <LoginForm />
      </main>
    </div>
  );
};

export default Home;
