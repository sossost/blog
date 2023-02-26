import { useState, Fragment } from "react";
import { SessionProvider, getSession } from "next-auth/react";

import { getBlogIdByUserId } from "../helpers/api-auth";
import { getCategoryByUserId } from "../helpers/api-category";
import CategoriesContext from "../components/store/category-context";
import AuthContext from "../components/store/auth-context";

import ErrorPage from "../components/contents/error-page";
import Layout from "../components/layout/Layout";

import "../../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const { categories, userId, blogId, invalidPage } = pageProps;

  const [invalid, setInvalid] = useState(invalidPage);

  return (
    <SessionProvider session={session}>
      <AuthContext.Provider
        value={{ invalid: invalid, setInvalid: setInvalid }}
      >
        {invalid ? (
          <ErrorPage />
        ) : (
          <Fragment>
            {!userId ? (
              <Component {...pageProps} />
            ) : (
              <CategoriesContext.Provider
                value={{
                  categories: categories,
                }}
              >
                <Layout blogId={blogId}>
                  <Component {...pageProps} />
                </Layout>
              </CategoriesContext.Provider>
            )}
          </Fragment>
        )}
      </AuthContext.Provider>
    </SessionProvider>
  );
}

MyApp.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  const userId = ctx.query.userId;
  const session = await getSession({ req: ctx.req });

  const categories = await getCategoryByUserId(userId);
  const blogId = await getBlogIdByUserId(userId);

  console.log(ctx.pathname);

  if (
    ctx.pathname.substr(0, 5) !== "/auth" &&
    ctx.pathname !== "/" &&
    !blogId
  ) {
    const invalidPage = true;
    return {
      pageProps: { invalidPage },
    };
  } /* auth 관련 페이지가 아니면서 url의 userId에 해당하는 blogId가 없으면 권한없는 페이지를 전달 */

  if (Component.getInitialProps) {
    // Component의 context로 ctx를 넣어주자
    pageProps = await Component.getInitialProps(ctx);
  }

  // return한 값은 해당 컴포넌트의 props로 들어가게 됩니다.
  return { pageProps: { categories, userId, blogId } };
};

export default MyApp;
