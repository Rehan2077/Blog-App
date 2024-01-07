import React from "react";
import { images } from "../../../constants/";
import { MdRemoveRedEye } from "react-icons/md";

const AdminCommentComponent = ({ classname }) => {
  return (
    <div
      className={`my-[1.15rem] flex items-center justify-between gap-5 lg:gap-1  ${classname}`}
    >
      <div className="flex items-center gap-2 hover:cursor-pointer">
        <img className="h-9 w-9 rounded-xl" src={images.DisplayImage} alt="" />
        <div>
          <h3 className="font-semibold text-dark-soft">Username </h3>
          <p className="line-clamp-1 text-[0.8rem] text-dark-thin">
            Lorem ipsum dolor sit. Lorem, ipsum dolor.
          </p>
        </div>
      </div>
      <div className={`text-xl text-dark-thin hover:cursor-pointer`}>
        <MdRemoveRedEye className="hover:text-blue-500 transition-all ease-linear" />
      </div>
    </div>
  );
};

export default AdminCommentComponent;
