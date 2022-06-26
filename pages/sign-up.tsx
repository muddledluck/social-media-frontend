import type { NextPage } from "next";
import Head from "next/head";
import SignUpForm from "@/components/auth/signUp/signUp-form";
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>SignUp Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SignUpForm />
      </main>
    </div>
  );
};

export default Home;
