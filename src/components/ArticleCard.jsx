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
      className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] h-[22rem] w-72  2xl:h-[24.5rem] 2xl:w-[21rem] transition-all ease-linear hover:shadow-[rgba(13,_38,_200,_0.3)_0px_9px_20px] hover:scale-105 ${classname} `}
      onClick={navigateToPost}
    >
      <img
        src={post?.photo ? stables.UPLOAD_FOLDER_BASE_URL + post.photo : images.PostPlaceholder}
        className="w-full object-cover object-center h-48 2xl:h-56"
        alt={post.title}
      />
      <div className="px-3 py-2 ">
        <h2 className="text-dark-hard text-lg 2xl:text-xl font-roboto font-bold">
          {post.title}
        </h2>
        <p className="text-dark-soft text-sm 2xl:text-base leading-5 my-2">
          {post.caption}
        </p>
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center gap-1">
            <img
              src={post?.author?.avatar ? stables.UPLOAD_FOLDER_BASE_URL + post.author.avatar : images.User}
              className="w-7 h-7 2xl:w-9 2xl:h-9 rounded-full "
              alt=""
            />
            <div className="flex flex-col">
              <h3 className="font-semibold ">{post?.author.name}</h3>
              <p className="flex gap-[2px] items-center text-xs 2xl:text-sm ">
                {" "}
                {post?.author.verified && (
                  <>
                    <VscVerified className="text-primary " />
                    <span className="font-light text-dark-thin italic">
                      verified writer
                    </span>
                  </>
                )}{" "}
              </p>
            </div>
          </div>
          <div className="font-semibold text-sm 2xl:text-base italic mr-2">
            {formattedDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
