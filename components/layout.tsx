import Head from "next/head";
import React from "react";
import NavBarNew from "./ui/navbar-new";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Framework for generating ideas." />
        <meta name="title" property="og:title" content="Forward" />
        <meta property="og:type" content="Website" />
        <meta name="image" property="og:image" content="https://i.postimg.cc/7Y1hK70Z/Forward-logos-black.png" />
        <meta name="description" property="og:description" content="Framework for generating ideas." />
        <meta name="author" content="Pedro Fuenmayor" />
      </Head>
      <NavBarNew />
      <main>{children}</main>
    </>
  );
}
