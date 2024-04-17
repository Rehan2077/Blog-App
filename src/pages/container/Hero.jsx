import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { images } from "../../constants";

const PostCategories = [
  {
    id: 1,
    name: "Technology",
  },
  {
    id: 2,
    name: "Entertainment",
  },
  {
    id: 3,
    name: "Science",
  },
  {
    id: 4,
    name: "Education",
  },
  {
    id: 5,
    name: "Others",
  },
];

const Hero = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");

  return (
    <section className="container mx-auto flex flex-col justify-between px-5 pb-5 lg:flex-row  ">
      <div className="lg:mt-15 md:mt-12 lg:w-2/5">
        <h1 className="text-center font-roboto text-3xl font-semibold text-dark-soft md:text-4xl lg:text-left lg:text-3xl xl:text-5xl">
          Expand your knowledge with insightful articles{" "}
          {userInfo && userInfo.name.split(" ")[0]}
        </h1>
        <p className="mt-4 text-center text-dark-thin md:text-xl lg:mt-2 lg:text-left lg:text-lg xl:text-xl ">
          Welcome to DevBlog, where knowledge meets community. Dive into a
          vibrant ecosystem of shared insights, where every perspective is
          valued. Let's come together and carve the path for the future of
          technology!
        </p>
        <div className="relative mt-7 flex flex-col lg:mt-3 lg:flex-row xl:mt-3 2xl:mt-10">
          <div className="relative md:w-full">
            <FiSearch className=" absolute left-2 top-[10px] h-5 w-5 text-[#959EAD] md:top-[12px]" />
            <input
              className="h-10 w-full rounded-lg pl-10 pr-3 text-dark-hard shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] outline-none transition-all ease-linear placeholder:font-semibold focus:shadow-[rgba(13,_38,_200,_0.3)_0px_9px_20px] md:h-11 md:flex-1 md:pr-24"
              type="text"
              placeholder="Search article"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Link
            to={{
              pathname: "/article",
              search: `?search=${search}`,
            }}
          >
            <button className="mt-2 h-10 w-full  rounded-lg border-none bg-primary font-semibold text-white transition-all ease-linear hover:bg-blue-700 md:absolute md:right-2 md:top-[14px] md:h-8 md:w-20 md:-translate-y-1/2">
              Search
            </button>
          </Link>
        </div>
        <div className="mt-4 flex w-full flex-col items-start gap-4 py-2 text-sm font-semibold lg:ml-1 lg:mt-3  lg:flex-row lg:flex-nowrap xl:mt-3">
          <span className="w-24 font-bold italic text-dark-thin">
            Popular Tags:
          </span>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-primary ">
            {PostCategories.map((category) => (
              <li
                key={category.id}
                className="rounded-lg bg-blue-100  px-3  py-1 transition-all ease-linear hover:bg-blue-200"
              >
                <Link to={`/article?category=${category.name}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="hidden items-center justify-end lg:flex xl:w-1/2 ">
        <img src={images.BlogImage} alt="Live chat" />
      </div>
    </section>
  );
};

export default Hero;
