import React from "react";
import { VscVerified } from "react-icons/vsc";

import { images } from "../constants";

const ArticleCard = ({ classname }) => {
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] h-[22rem] w-72  2xl:h-[24.5rem] 2xl:w-[21rem] transition-all ease-linear hover:shadow-[rgba(13,_38,_200,_0.3)_0px_9px_20px] hover:scale-105 ${classname} `}
    >
      <img
        src={images.CardImage}
        className="w-full object-cover object-center h-48 2xl:h-56"
        alt=""
      />
      <div className="px-3 py-2 ">
        <h2 className="text-dark-hard text-lg 2xl:text-xl font-roboto font-bold">
          Future of Work
        </h2>
        <p className="text-dark-soft text-sm 2xl:text-base leading-5 my-2">
          Majority of peole will work in jobs that don't exist today.
        </p>
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center gap-1">
            <img
              src={images.DisplayImage}
              className="w-7 h-7 2xl:w-9 2xl:h-9 rounded-full "
              alt=""
            />
            <div className="flex flex-col">
              <h3 className="font-semibold 2xl:text-lg">Rehan Fazal</h3>
              <p className="flex gap-[2px] items-center text-xs 2xl:text-sm ">
                {" "}
                {true && (
                  <VscVerified className="text-primary " />
                )}{" "}
                <span className="font-light text-dark-thin italic">
                  verified writer
                </span>{" "}
              </p>
            </div>
          </div>
          <div className="font-semibold text-sm 2xl:text-base italic mr-2">02 May</div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
