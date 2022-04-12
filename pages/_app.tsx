import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/apollo";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { deleteGuestUser } from "../helper/delete-guest-user";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }: AppProps) {
  if (process.browser) {
    window.onbeforeunload = () => {
      // your callback
      deleteGuestUser()
    }
  }

  return (
    <SessionProvider>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
