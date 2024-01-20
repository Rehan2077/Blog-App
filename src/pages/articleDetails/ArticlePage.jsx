import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import BreadCrumbs from "../../components/BreadCrumbs";
import { images, stables } from "../../constants";
import SuggestedPosts from "./container/SuggestedPosts";
import CommentsContainer from "../../components/comments/CommentsContainer";
import SocialShare from "../../components/SocialShare";
import { getAllPosts, getSinglePost } from "../../services/index/posts";
import ArticleDetailsSkeleton from "../../components/skeleton/ArticleDetailsSkeleton";
import { useSelector } from "react-redux";
import Editor from "../../components/editor/Editor";


const ArticlePage = () => {
  const { slug } = useParams();
  const { userInfo } = useSelector((state) => state.user);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost(slug),
    queryKey: ["post", slug],
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    },
  });

  const { data: suggestedPostsData } = useQuery({
    queryFn: () => getAllPosts("", 5),
    queryKey: ["posts"],
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToTop();
  });

  const breadCrumbsData = [
    { name: "Home", link: "/" },
    { name: "Article", link: "/article" },
    { name: `${data?.post.title}`, link: `/article/${slug}` },
  ];

  const pageUrl = encodeURI(
    `https://blog-app-gray-two.vercel.app/article/${slug}`,
  );
  const title = encodeURIComponent(`${data?.post?.title}`);

  if (isLoading || isError) return <ArticleDetailsSkeleton />;

  return (
    <section className="container mx-auto flex max-w-7xl flex-col px-5 py-5 lg:flex-row lg:gap-5 lg:py-2 ">
      <article className="flex-1 lg:w-2/3 ">
        <BreadCrumbs data={breadCrumbsData} />
        <img
          src={
            data?.post?.photo
              ? stables.UPLOAD_FOLDER_BASE_URL + data?.post?.photo
              : images.PostPlaceholder
          }
          className="mt-1 h-auto w-full rounded-lg object-cover object-center md:aspect-video lg:h-[25rem] xl:h-[26rem]"
          alt="Laptop"
        />
        <div className="mt-3 flex gap-4 tracking-widest text-primary lg:text-xl">
          {data?.post?.category?.map((category) => (
            <Link key={category.name} to={`article?category=${category?.name}`}>
              {category.name}
            </Link>
          ))}
        </div>

        <h2 className="my-3 font-roboto text-2xl font-semibold tracking-wide text-dark-hard lg:text-3xl xl:text-4xl">
          {data?.post?.title}
        </h2>
        <div className=" leading-relaxed text-dark-soft opacity-90 lg:mb-3 lg:text-lg">
            <Editor content={data?.post?.body} editable={false} />
        </div>
        <SocialShare url={pageUrl} title={title} />
        <CommentsContainer
          totalComments={data?.totalComments}
          postSlug={slug}
          comments={data?.post?.comments}
          postId={data?.post?._id}
          loggedInUser={userInfo}
          key={data?.post?._id}
        />
      </article>
      <SuggestedPosts
        classname={""}
        header={"Latest Articles"}
        currentPostId={data?.post?._id}
        posts={suggestedPostsData?.data?.posts}
        tags={data?.post?.tags}
      />
    </section>
  );
};

export default ArticlePage;
