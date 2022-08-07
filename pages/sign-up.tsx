import type { NextPage } from "next";
import Head from "next/head";
import SignUpForm from "@/components/auth/signUp/signUp-form";
import { withDashboardRedirect } from "@/HOC/withAuth";
import { useRouter } from "next/router";
import { useSelector } from "store/store";
import { useEffect } from "react";
const SignUp: NextPage = () => {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.user);
  useEffect(() => {
    if (isLoggedIn) router.push("/");
  }, [isLoggedIn, router]);
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
