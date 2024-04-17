import React from "react";
import { Link } from "react-router-dom";
import { images, stables } from "../../../constants";

const SuggestedPosts = ({
  classname,
  header,
  currentPostId = "",
  posts = [],
  tags = [],
}) => {
  return (
    <section
      className={`mb-5 mt-10 h-fit rounded-lg p-4  shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] transition-all ease-linear hover:shadow-[rgba(13,_38,_200,_0.3)_0px_9px_20px] lg:w-1/3 ${classname}`}
    >
      <h2 className="font-roboto text-lg font-[450] text-dark-hard lg:text-xl">
        {header}
      </h2>
      <div className="mt-5 flex flex-col md:flex-row md:flex-wrap md:justify-between md:gap-5 lg:flex-col lg:flex-nowrap">
        {posts?.map((post) => {
          if (currentPostId === post?._id)
            return <div key={post?._id} className="hidden"></div>;
          return (
            <>
              <div
                key={post?._id}
                className="my-1 flex items-center  gap-3 rounded-lg border p-2 transition-all ease-linear hover:border-primary md:w-[21rem] lg:w-full"
              >
                <Link to={`/article/${post.slug}`}>
                  <img
                    src={
                      post?.photo
                        ? stables.UPLOAD_FOLDER_BASE_URL + post?.photo
                        : images.PostPlaceholder
                    }
                    className="h-14 w-12 rounded-lg md:w-20"
                    alt=""
                  />
                </Link>
                <Link to={`/article/${post.slug}`}>
                  <div className="flex flex-col">
                    <h3 className="text-sm font-[450] text-dark-soft md:text-base lg:text-lg xl:text-xl ">
                      {post.title}
                    </h3>
                    <span className="mt-1 text-xs font-thin text-dark-thin md:text-[0.8rem] lg:text-base">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}
                    </span>
                  </div>
                </Link>
              </div>
            </>
          );
        })}
      </div>
      {tags && tags.length > 0 && (
        <>
          <h2 className="mt-3 font-roboto text-lg font-[450] text-dark-hard lg:text-xl ">
            Tags
          </h2>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 font-roboto text-sm text-primary lg:text-base">
            {tags?.map((item, index) => (
              <Link
                to={"/"}
                key={index}
                className=" rounded-lg bg-blue-100 px-3  py-1 transition-all ease-linear hover:bg-blue-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default SuggestedPosts;
