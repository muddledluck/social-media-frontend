import type { NextPage } from "next";
import Head from "next/head";
import LoginForm from "@/components/auth/login-form/login-form";
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LoginForm />
      </main>
    </div>
  );
};

export default Home;
