import React from "react";
import { images, stables } from "../../../constants/";
import { MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";

const AdminCommentComponent = ({ comment, toggleComment, classname }) => {
  return (
    <div
      className={`my-[1.15rem] flex items-center justify-between gap-5 lg:gap-1  ${classname}`}
    >
      <Link to={`/article/${comment?.post?.slug}`}>
        <div className="flex items-center gap-2 ">
          <img
            className="h-9 w-9 rounded-xl"
            src={
              comment?.author?.avatar
                ? stables.UPLOAD_FOLDER_BASE_URL + comment.author.avatar
                : images.User
            }
            alt=""
          />
          <div>
            <h3 className="font-semibold text-dark-soft">
              {comment?.author?.name}{" "}
            </h3>
            <p className="line-clamp-1 text-[0.8rem] text-dark-thin">
              {comment?.desc}
            </p>
          </div>
        </div>
      </Link>
      <div className={`text-xl text-dark-thin hover:cursor-pointer`}>
        <MdRemoveRedEye
          className={`${
            comment?.check === true
              ? "text-blue-500 hover:text-red-500"
              : "text-red-500 hover:text-blue-500"
          } transition-all ease-linear `}
        />
      </div>
    </div>
  );
};

export default AdminCommentComponent;
