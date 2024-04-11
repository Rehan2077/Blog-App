import React from "react";
import { VscVerified } from "react-icons/vsc";

import { images } from "../constants";
import { stables } from "../constants";
import { formatDate } from "../utils/formatDate";
import { useNavigate } from "react-router-dom";

const ArticleCard = ({ classname = "", post }) => {
  const joinedDate = formatDate(post?.createdAt);
  const formattedDate = new Date(joinedDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const navigate = useNavigate();

  const navigateToPost = () => {
    navigate(`/article/${post.slug}`);
  };

  return (
    <div
      className={`h-[22rem] w-72 overflow-hidden rounded-xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]  transition-all ease-linear hover:scale-105 hover:shadow-[rgba(13,_38,_200,_0.3)_0px_9px_20px] 2xl:h-[24.5rem] 2xl:w-[21rem] ${classname} `}
      onClick={navigateToPost}
    >
      <img
        src={
          post?.photo
            ? stables.UPLOAD_FOLDER_BASE_URL + post.photo
            : images.PostPlaceholder
        }
        className="h-48 w-full object-cover object-center 2xl:h-56"
        alt={post.title}
      />
      <div className="px-3 py-2 ">
        <h2 className="line-clamp-1 font-roboto text-lg font-bold  text-dark-hard 2xl:text-xl">
          {post.title}
        </h2>
        <p className="my-2 line-clamp-2 text-sm leading-5 text-dark-soft 2xl:text-base">
          {post.caption}
        </p>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-1">
            <img
              src={
                post?.author?.avatar
                  ? stables.UPLOAD_FOLDER_BASE_URL + post.author.avatar
                  : images.User
              }
              className="h-7 w-7 rounded-full 2xl:h-9 2xl:w-9 "
              alt=""
            />
            <div className="flex flex-col">
              <h3 className="font-semibold ">{post?.author.name}</h3>
              <p className="flex items-center gap-[2px] text-xs 2xl:text-sm ">
                {" "}
                {post?.author.verified && (
                  <>
                    <VscVerified className="text-primary " />
                    <span className="font-light italic text-dark-thin">
                      verified writer
                    </span>
                  </>
                )}{" "}
              </p>
            </div>
          </div>
          <div className="mr-2 text-sm font-semibold italic 2xl:text-base">
            {formattedDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
