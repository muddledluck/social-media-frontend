import type { NextPage } from "next";
import Head from "next/head";
import LoginForm from "@/components/auth/login-form/login-form";
import { withDashboardRedirect } from "@/HOC/withAuth";
import { useRouter } from "next/router";
import { useSelector } from "store/store";
import { useEffect } from "react";
const Login: NextPage = () => {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.user);
  useEffect(() => {
    if (isLoggedIn) router.push("/");
  }, [isLoggedIn, router]);
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

export default withDashboardRedirect(Login);
