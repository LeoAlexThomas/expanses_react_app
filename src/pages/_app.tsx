// import { FirebaseAppProvider } from "@/context/firebaseApp";
import api from "@/components/api";
import { LoginCheckProvider } from "@/context/loginCheck";
import { UserInfoProvider } from "@/context/userInfo";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { ReactElement, ReactNode } from "react";
import Head from "next/head";
import { PageLoaderProvider } from "@/context/pageLoaderContext";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Provider } from "@/components/ui/provider";
import { ThemeCheckProvider } from "@/context/themeCheck";

export const swrConfigData = {
  fetcher: api,
};

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        {/* NOTE: Below code is to prevent zooming in iPhone when input is focused */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SWRConfig value={swrConfigData}>
        <Provider>
          <ThemeCheckProvider>
            <LoginCheckProvider>
              <UserInfoProvider>
                <PageLoaderProvider>
                  {getLayout(<Component {...pageProps} key={router.asPath} />)}
                </PageLoaderProvider>
              </UserInfoProvider>
            </LoginCheckProvider>
          </ThemeCheckProvider>
        </Provider>
      </SWRConfig>
    </>
  );
}
