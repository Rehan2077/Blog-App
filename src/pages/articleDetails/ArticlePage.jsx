import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import parse from "html-react-parser";
import { generateHTML } from "@tiptap/react";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";

import BreadCrumbs from "../../components/BreadCrumbs";
import { images, stables } from "../../constants";
import SuggestedPosts from "./container/SuggestedPosts";
import CommentsContainer from "../../components/comments/CommentsContainer";
import SocialShare from "../../components/SocialShare";
import { getAllPosts, getSinglePost } from "../../services/index/posts";
import ArticleDetailsSkeleton from "../../components/skeleton/ArticleDetailsSkeleton";
import { useSelector } from "react-redux";

const tags = ["Learn", "JavaScript", "ChatGPT", "Entertainment", "UI/UX"];

const ArticlePage = () => {
  const { slug } = useParams();
  const [body, setBody] = useState(null);
  const {userInfo} = useSelector(state=>state.user)

  const { data, isLoading, } = useQuery({
    queryFn: () => getSinglePost(slug),
    queryKey: ["post"],
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    },
  });

  const { data: suggestedPostsData, } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
  });

  useMemo(() => {
    if (data?.post?.body) {
      setBody(
        parse(
          generateHTML(data?.post?.body, [
            Document,
            Paragraph,
            Text,
            Bold,
            Italic,
          ])
        )
      );
    }
  }, [data?.post?.body]);

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  
    useEffect(()=>{
      scrollToTop()
    })

  const breadCrumbsData = [
    { name: "Home", link: "/" },
    { name: "Article", link: "/article" },
    { name: `${data?.post.title}`, link: `/article/${slug}` },
  ];

  const pageUrl = encodeURI(
    `https://blog-app-gray-two.vercel.app/article/${slug}`
  );
  const title = encodeURIComponent(`${data?.post?.title}`);

  if (isLoading)
    return (
      <ArticleDetailsSkeleton />
    );

  return (
    <section className="container mx-auto max-w-7xl flex flex-col px-5 py-5 lg:py-2 lg:flex-row lg:gap-5 ">
      <article className="flex-1 lg:w-2/3 ">
        <BreadCrumbs data={breadCrumbsData} />
        <img
          src={
            data?.post?.photo
              ? stables.UPLOAD_FOLDER_BASE_URL + data?.post?.photo
              : images.PostPlaceholder
          }
          className="w-full mt-1 rounded-lg object-cover object-center h-auto md:aspect-video lg:h-[25rem] xl:h-[26rem]"
          alt="Laptop"
        />
        <div className="flex gap-4 text-primary tracking-widest mt-3 lg:text-xl">
          {data?.post?.category?.map((category) => (
            <Link key={category.name} to={`article?category=${category?.name}`}>
              {category.name}
            </Link>
          ))}
        </div>

        <h2 className="text-dark-hard font-semibold font-roboto tracking-wide text-2xl my-3 lg:text-3xl xl:text-4xl">
          {data?.post?.title}
        </h2>
        <div className="text-dark-soft opacity-90 leading-relaxed lg:mb-3 lg:text-lg">
          {body}
        </div>
        <SocialShare url={pageUrl} title={title} />
        <CommentsContainer postSlug={slug} comments={data?.post?.comments} postId={data?.post?._id} loggedInUser={userInfo} key={data?.post?._id} />
      </article>
      <SuggestedPosts
        classname={""}
        header={"Latest Articles"}
        posts={suggestedPostsData?.posts}
        tags={tags}
      />
    </section>
  );
};

export default ArticlePage;
