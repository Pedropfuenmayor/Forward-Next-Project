import  Head  from 'next/head'
import React from "react";
import NavBarNew from "./ui/navbar-new";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Forward</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBarNew />
      <main>{children}</main>
    </>
  );
}
