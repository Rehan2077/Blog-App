import React from "react";
import { MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { images, stables } from "../../../constants";
import { formatDate } from "../../../utils/formatDate";
import { Link } from "react-router-dom";

const AdminPostComponent = ({ post, deletePostHandler, classname }) => {
  return (
    <div
      className={`my-6 flex flex-col items-center justify-between gap-1 lg:my-[1.15rem] lg:flex-row  ${classname}`}
    >
      <Link to={`/article/${post?.slug}`}>
        <div className="flex items-center gap-2 lg:gap-3">
          <img
            className="h-10 w-12 rounded-lg object-cover"
            src={
              post?.photo
                ? stables.UPLOAD_FOLDER_BASE_URL + post.photo
                : images.PostPlaceholder
            }
            alt="article"
          />
          <div>
            <div className="flex text-xs text-dark-thin">
              <span>
                {post?.author?.name} - <br className="lg:hidden" />
                {formatDate(post?.createdAt)}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-dark-soft lg:text-base">
              {post?.title}
            </h3>
            <p className="line-clamp-2 text-[0.8rem] text-dark-soft">{}</p>
          </div>
        </div>
      </Link>
      <div
        className={`flex gap-5 pr-4 text-lg text-dark-thin lg:text-xl xl:text-2xl `}
      >
        <MdDelete
          onClick={() => deletePostHandler(post?.slug)}
          className="transition-all ease-linear hover:cursor-pointer hover:text-red-500"
        />
        <Link to={`/admin/posts/edit/${post?.slug}`}>
          <MdEdit className="transition-all ease-linear hover:cursor-pointer hover:text-green-500" />
        </Link>
        <MdRemoveRedEye className="transition-all ease-linear hover:cursor-pointer hover:text-blue-500" />
      </div>
    </div>
  );
};

export default AdminPostComponent;
