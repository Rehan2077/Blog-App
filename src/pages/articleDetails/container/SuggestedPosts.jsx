import React from "react";
import { Link } from "react-router-dom";

const SuggestedPosts = ({ classname, header, posts = [], tags=[] }) => {
  return (
    <section
      className={`h-fit rounded-lg p-4 mt-10 mb-5  lg:w-1/3 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] transition-all ease-linear hover:shadow-[rgba(13,_38,_200,_0.3)_0px_9px_20px] ${classname}`}
    >
      <h2 className="text-lg text-dark-hard font-roboto font-[450] lg:text-xl">
        {header}
      </h2>
      <div className="flex flex-col mt-5 md:flex-row md:gap-5 md:flex-wrap md:justify-between lg:flex-nowrap lg:flex-col">
        {posts?.map((item, index) => (
          <div
            key={index}
            className="flex gap-3 items-center  my-2 hover:border-primary border rounded-lg p-2 transition-all ease-linear md:w-[21rem] lg:w-full"
          >
            <img src={item.image} className="w-12 md:w-16 rounded-lg " alt="" />
            <div className="flex flex-col">
              <h3 className="text-sm font-[450] md:text-base lg:text-lg xl:text-xl text-dark-soft ">
                {item.title}
              </h3>
              <span className="text-xs md:text-[0.8rem] lg:text-base text-dark-thin mt-1 font-thin">
                {new Date(item.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-lg mt-3 text-dark-hard font-roboto font-[450] lg:text-xl ">Tags</h2>
      <div className="flex flex-wrap mt-2 font-roboto gap-x-4 gap-y-2 text-sm text-primary lg:text-base">
        {tags?.map((item, index)=>(
            <Link to={"/"} key={index} className=" px-3 py-1 rounded-lg  hover:bg-blue-200 transition-all ease-linear bg-blue-100">{item}</Link>
        ))}
      </div>
    </section>
  );
};

export default SuggestedPosts;
