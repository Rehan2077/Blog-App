import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { HiOutlineCamera } from "react-icons/hi";

import {
  getAllPosts,
  getSinglePost,
  updatePost,
} from "../../../services/index/posts";
import ArticleDetailsSkeleton from "../../../components/skeleton/ArticleDetailsSkeleton";
import { images, stables } from "../../../constants";
import SocialShare from "../../../components/SocialShare";
import CommentsContainer from "../../../components/comments/CommentsContainer";
import Editor from "../../../components/editor/Editor";

const EditPost = () => {
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

  useMemo(() => {
    if (!isLoading && !isError) {
      setInitialPhoto(data?.post?.photo);
      //     parse(
      //       generateHTML(data?.post?.body, [
      //         Document,
      //         Paragraph,
      //         Text,
      //         Bold,
      //         Italic,
      //       ]),
      //     ),
      //   );
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
    updatedData.append("document", JSON.stringify({ body }));

    isMutateUpdatePost({
      updatedData,
      slug,
    });
  };

  const pageUrl = encodeURI(
    `https://blog-app-gray-two.vercel.app/article/${slug}`,
  );
  const title = encodeURIComponent(`${data?.post?.title}`);

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

        <h2 className="my-3 font-roboto text-2xl font-semibold tracking-wide text-dark-hard lg:text-3xl xl:text-4xl">
          {data?.post?.title}
        </h2>
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
