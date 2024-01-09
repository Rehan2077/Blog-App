import React from "react";
import { MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { images } from "../../../constants";

const AdminPostComponent = ({ classname }) => {
  return (
    <div
      className={`my-6 flex flex-col items-center justify-between gap-1 lg:my-[1.15rem] lg:flex-row  ${classname}`}
    >
      <div className="flex items-center gap-2 hover:cursor-pointer lg:gap-3">
        <img className="h-9 w-9 rounded-xl " src={images.CardImage} alt="" />
        <div>
          <div className="flex text-xs text-dark-thin">
            <span>
              {`rfazal0124@gmail.com`} - <br className="lg:hidden" />{" "}
              {`October 25th, 2023 08:55 AM`}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-dark-soft lg:text-base">
            Title: Lorem ipsum dolor sit.{" "}
          </h3>
          <p className="line-clamp-2 text-[0.8rem] text-dark-soft">
            Lorem ipsum dolor sit. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Autem dolor commodi temporibus veritatis mollitia
            voluptatem sint quasi debitis rem deleniti?
          </p>
        </div>
      </div>
      <div
        className={`flex gap-5 pr-4 text-lg text-dark-thin lg:text-xl xl:text-2xl `}
      >
        <MdDelete className="transition-all ease-linear hover:cursor-pointer hover:text-red-500" />
        <MdEdit className="transition-all ease-linear hover:cursor-pointer hover:text-green-500" />
        <MdRemoveRedEye className="transition-all ease-linear hover:cursor-pointer hover:text-blue-500" />
      </div>
    </div>
  );
};

export default AdminPostComponent;
