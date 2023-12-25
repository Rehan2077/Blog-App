import React from "react";
import { FiSearch } from "react-icons/fi";

import { images } from "../../constants";
import { useSelector } from "react-redux";

const Hero = () => {

  const {userInfo} = useSelector(state=>state.user)

  return (
    <section className="container mx-auto p-5 flex flex-col lg:flex-row justify-between  ">
      <div className="lg:mt-15 md:mt-12 lg:w-2/5">
        <h1 className="font-roboto text-dark-soft text-3xl text-center lg:text-left md:text-4xl lg:text-3xl xl:text-5xl font-semibold">
          Read the most <br /> interesting articles  {userInfo && userInfo.name}
        </h1>
        <p className="text-dark-thin mt-4 text-center lg:mt-2 lg:text-lg xl:text-xl md:text-xl lg:text-left ">
          Welcome to DevBlog, your digital haven for all things code - join our
          vibrant community as we unravel the intricacies of development, share
          inspiring stories, and foster a passion for tech exploration!
        </p>
        <div className="flex flex-col lg:mt-3 lg:flex-row xl:mt-3 2xl:mt-10 relative mt-7">
          <div className="relative md:w-full">
            <FiSearch className=" absolute md:top-[12px] top-[10px] left-2 w-5 h-5 text-[#959EAD]" />
            <input
              className="md:flex-1 md:h-11 h-10 placeholder:font-semibold text-dark-hard pl-10 pr-3 md:pr-24 outline-none w-full rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] transition-all ease-linear focus:shadow-[rgba(13,_38,_200,_0.3)_0px_9px_20px]"
              type="text"
              placeholder="Search article"
            />
          </div>
          <button className="md:absolute md:right-2 md:top-[14px]  md:h-8 md:-translate-y-1/2 md:w-20 w-full border-none text-white hover:bg-blue-700 h-10 bg-primary rounded-lg mt-2 font-semibold transition-all ease-linear">
            Search
          </button>
        </div>
        <div className="flex flex-col w-full items-start lg:mt-3 lg:flex-row lg:flex-nowrap mt-4 xl:mt-3 py-2 text-sm  font-semibold gap-4 lg:ml-1">
          <span className="font-bold text-dark-thin w-24 italic">
            Popular Tags:
          </span>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-primary ">
            <li className="py-1 px-3  rounded-lg  hover:bg-blue-200 transition-all ease-linear bg-blue-100">
              Design
            </li>
            <li className="py-1 px-3  rounded-lg  hover:bg-blue-200 transition-all ease-linear bg-blue-100">
              Coding
            </li>
            <li className="py-1 px-3  rounded-lg  hover:bg-blue-200 transition-all ease-linear bg-blue-100">
              Science
            </li>
            <li className="py-1 px-3  rounded-lg  hover:bg-blue-200 transition-all ease-linear bg-blue-100">
              User Experiences
            </li>
            <li className="py-1 px-3  rounded-lg  hover:bg-blue-200 transition-all ease-linear bg-blue-100">
              Technology
            </li>
          </ul>
        </div>
      </div>
      <div className="lg:flex justify-end  hidden xl:w-1/2 ">
        <img className="" src={images.HeroImage} alt="Live chat" />
      </div>
    </section>
  );
};

export default Hero;
