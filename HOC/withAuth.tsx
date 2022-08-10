import { NextComponentType, NextPageContext } from "next";
import Router from "next/router";
import React from "react";
import { hasCookie } from "cookies-next";

/**
 * Reference: https://louisrli.github.io/blog/2019/11/17/auth-redirect-next-js/#.YuUg03ZByHt
 * A function that queries for the logged in user before rendering the page.
 * Should be called in getInitialProps. It redirects as desired.
 *
 * It allows for redirecting both if the user is not logged in (e.g., redirect
 * to login page) or redirecting if the user is logged in.
 *
 * If not logged in, redirects to the desired route.
 *
 * The return value indicates whether logic should continue or not after the call
 */

const redirectBasedOnLogin = async (
  ctx: NextPageContext,
  route: string,
  redirectIfAuthed: boolean
): Promise<boolean> => {
  let accessToken = hasCookie("accessToken");
  let refreshToken = hasCookie("refreshToken");
  // accessToken = ctx.req.cookies["accessToken"];
  // refreshToken = ctx.req.cookies["refreshToken"];
  const isLoggedIn = accessToken && refreshToken; //!TODO: verify user token
  const shouldRedirect = redirectIfAuthed ? isLoggedIn : !isLoggedIn;
  if (shouldRedirect) {
    if (ctx.res) {
      ctx.res.writeHead(302, {
        Location: route,
      });
      ctx.res.end();
    } else {
      Router.push(route);
    }
    return Promise.resolve(false);
  }
  return Promise.resolve(true);
};

/**
 * General HOC that allows redirection based on authentication. We should not
 * expose this: instead export specific routes and redirect combinations
 */
const withAuthRedirect =
  (route: string, redirectIfAuthed: boolean) =>
  <P,>(Page: NextComponentType<NextPageContext, {}, P>) => {
    return class AuthWrapper extends React.Component<P> {
      static async getInitialProps(ctx: NextPageContext) {
        const shouldContinue = await redirectBasedOnLogin(
          ctx,
          route,
          redirectIfAuthed
        );
        // Only continue if we're logged in. Otherwise, it might cause an
        // unnecessary call to a downstream getInitialProps that requires
        // authentication
        if (!shouldContinue) {
          return {};
        }
        if (Page.getInitialProps) {
          return Page.getInitialProps(ctx);
        }
        return { props: [] };
      }
      // client side check
      // async componentDidMount() {
      //   const isLoggedIn =
      //     (await AccessToken.isStored()) && (await RefreshToken.isStored());
      //   const shouldRedirect = redirectIfAuthed ? isLoggedIn : !isLoggedIn;
      //   if (shouldRedirect) {
      //     Router.push(route);
      //   }
      // }
      render() {
        return <Page {...this.props} />;
      }
    };
  };

/**
 * HOC that redirects to login page if the user is not logged in.
 */
export const withLoginRedirect = withAuthRedirect("/sign-in", false);

/**
 * HOC that redirects to the dashboard if the user is logged in.
 */
export const withDashboardRedirect = withAuthRedirect("/", true);
