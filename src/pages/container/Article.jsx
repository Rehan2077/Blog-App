import React from "react";
import { FaArrowRight } from "react-icons/fa";

import ArticleCard from "../../components/ArticleCard";

const Article = () => {
  return (
    <section className="container mx-auto flex flex-wrap md:gap-5 px-5 ">
      {/* <h1>Blogs</h1> */}
      <div className="flex gap-x-7 md:gap-x-10 2xl:gap-x-12 justify-center 2xl:justify-normal gap-y-10 xl:gap-x-7 flex-wrap">
        <ArticleCard classname={" "} />
        <ArticleCard classname={" "} />
        <ArticleCard classname={" "} />
        <ArticleCard classname={" "} />
      </div>
      <div className="w-full m-10 flex justify-center">
        <button className="flex w-max px-3 py-2 border-2 border-primary hover:border-transparent hover:bg-primary hover:text-white transition-all ease-linear items-center gap-2 text-primary font-semibold rounded-lg">
          <span>More articles</span> <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default Article;
