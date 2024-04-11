import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineCamera } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import SocialShare from "../../../components/SocialShare";
import CommentsContainer from "../../../components/comments/CommentsContainer";
import Editor from "../../../components/editor/Editor";
import ArticleDetailsSkeleton from "../../../components/skeleton/ArticleDetailsSkeleton";
import { stables } from "../../../constants";
import { getSinglePost, updatePost } from "../../../services/index/posts";
import { PostCategories } from "../../../utils/categoryTypes";

const EditPost = () => {
  const categories = PostCategories;

  const [photo, setPhoto] = useState(null);
  const [body, setBody] = useState(null);
  const { slug } = useParams();
  const { userInfo } = useSelector((state) => state.user);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost(slug),
    queryKey: ["post", slug],
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    },
  });

  const { mutate: isMutateUpdatePost, isLoading: isUpdatePostLoading } =
    useMutation({
      mutationFn: ({ updatedData, slug }) => {
        return updatePost(updatedData, slug, userInfo.token);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["post", slug] });
        toast.success(data.message);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  const [initialPhoto, setInitialPhoto] = useState(data?.post?.photo);
  const [category, setCategory] = useState(data?.post?.categories[0]);

  console.log(category);

  useEffect(() => {
    setCategory(data?.post?.categories[0]);
  }, [data?.post]);

  useMemo(() => {
    if (!isLoading && !isError) {
      setInitialPhoto(data?.post?.photo);
    }
  }, [data?.post?.body, data?.post?.photo]);

  const handleSubmit = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleUpdatePost = async () => {
    let updatedData = new FormData();

    if (photo) {
      updatedData.append("postPicture", photo);
    }
    updatedData.append(
      "document",
      JSON.stringify({
        body,
        title: newTitle,
        caption: newCaption,
        categories: category,
      }),
    );

    isMutateUpdatePost({
      updatedData,
      slug,
    });
  };

  const pageUrl = encodeURI(
    `https://blog-app-gray-two.vercel.app/article/${slug}`,
  );
  const title = encodeURIComponent(`${data?.post?.title}`);
  const [newTitle, setNewTitle] = useState(data?.post?.title);

  const [newCaption, setNewCaption] = useState(data?.post?.caption);

  if (isLoading) return <ArticleDetailsSkeleton />;

  return (
    <section className="container mx-auto mt-5 flex max-w-7xl flex-col px-5 py-5 lg:flex-row lg:gap-5 lg:py-2 ">
      <article className="flex-1 lg:w-2/3 ">
        <label htmlFor="postPicture">
          {photo ? (
            <img
              className="mt-1 aspect-video h-auto w-[50%] rounded-lg object-cover object-center"
              src={URL.createObjectURL(photo)}
              alt={data?.post?.title}
            />
          ) : initialPhoto ? (
            <img
              className="mt-1 aspect-video h-auto w-[50%] rounded-lg object-cover object-center"
              src={stables.UPLOAD_FOLDER_BASE_URL + data?.post?.photo}
              alt={data?.post?.title}
            />
          ) : (
            <div className="flex h-auto w-[50%] cursor-pointer items-center justify-start bg-blue-50/50">
              <HiOutlineCamera className="text-4xl text-primary" />
            </div>
          )}
        </label>
        <input
          className="hidden"
          type="file"
          accept="image/*"
          name="postPicture"
          id="postPicture"
          onChange={handleSubmit}
        />
        <div className="mt-3 flex gap-4 tracking-widest text-primary lg:text-xl">
          {data?.post?.category?.map((category) => (
            <Link key={category.name} to={`article?category=${category?.name}`}>
              {category.name}
            </Link>
          ))}
        </div>

        <input
          value={newTitle?.length > 0 ? newTitle : data?.post?.title}
          onChange={(e) => setNewTitle(e.target.value)}
          className="my-3 block w-full border-2 px-3 py-2 font-roboto text-2xl font-semibold tracking-wide text-dark-hard outline-none focus:border-primary  lg:text-3xl xl:text-4xl"
        />
        <input
          value={newCaption?.length > 0 ? newCaption : data?.post?.caption}
          onChange={(e) => setNewCaption(e.target.value)}
          className="my-3 block w-full border-2 px-3 py-2 font-roboto text-xl  tracking-wide text-dark-hard outline-none focus:border-primary "
        />

        <label
          htmlFor="category"
          className="pl-0.5 font-semibold text-dark-soft"
        >
          Select Category:
        </label>
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          name="category"
          id="category"
          className="mb-2 rounded-lg border-2 border-slate-300 p-2"
        >
          O
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <div className="leading-relaxed text-dark-soft opacity-90 lg:mb-3 lg:text-lg">
          {!isLoading && !isError && (
            <Editor
              key={data?.post?._id}
              content={data?.post?.body}
              editable={true}
              onDataChange={(data) => setBody(data)}
            />
          )}
        </div>
        <button
          onClick={handleUpdatePost}
          className=" m-2 rounded-lg bg-primary px-3 py-2 text-white transition-all ease-linear hover:bg-blue-700 disabled:cursor-not-allowed"
        >
          Update
        </button>
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
    </section>
  );
};

export default EditPost;
