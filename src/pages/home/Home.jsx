import React, { useEffect } from "react";
import Article from "../container/Article";
import CTA from "../container/CTA";
import Hero from "../container/Hero";

const Home = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToTop();
  });

  return (
    <>
      <Hero />
      <Article />
      <CTA />
    </>
  );
};

export default Home;
