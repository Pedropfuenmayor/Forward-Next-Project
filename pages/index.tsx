import type { NextPage } from "next";
import Hero from "../components/hero";
import Features from "../components/features";
import Section from "../components/sections";
import Cta from "../components/cta";
import Footer from "../components/footer";

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <Features />
      {/* <Section /> */}
      <Cta />
      <Footer />
    </>
  );
};

export default Home;
