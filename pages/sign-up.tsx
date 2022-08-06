import type { NextPage } from "next";
import Head from "next/head";
import SignUpForm from "@/components/auth/signUp/signUp-form";
import { withDashboardRedirect } from "@/HOC/withAuth";
const SignUp: NextPage = () => {
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

export default withDashboardRedirect(SignUp);
