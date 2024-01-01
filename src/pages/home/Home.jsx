import React, { useEffect } from "react";
import Hero from "../container/Hero";
// import { images } from '../../constants'
import Article from "../container/Article";
import CTA from "../container/CTA";

const Home = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(()=>{
    scrollToTop()
  })

  return (
    <>
      <Hero />
      <Article />
      {/* <div className='relative -top-52 z-10'>
          <img src={images.Oval} alt="" />
        </div> */}
      <CTA />
    </>
  );
};

export default Home;
