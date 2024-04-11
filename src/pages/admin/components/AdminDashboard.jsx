import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllComments } from "../../../services/index/comments";
import { deletePost, getAllPosts } from "../../../services/index/posts";
import AdminCommentComponent from "./AdminCommentComponent";
import AdminPostComponent from "./AdminPostComponent";

let isFirstVisited = true;
const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { userInfo } = useSelector((state) => state.user);

  const {
    data: postData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryFn: () => getAllPosts(filter, 6),
    queryKey: ["posts"],
  });

  const { data: commentData, refetch: refetchComment } = useQuery({
    queryFn: () => getAllComments({ token: userInfo?.token }),
    queryKey: ["allComments"],
  });

  const { mutate: mutateDeletePost, isLoading: isLoadingDeletePost } =
    useMutation({
      mutationFn: ({ slug }) => {
        return deletePost({ slug, token: userInfo?.token });
      },
      mutationKey: ["comments"],
      onSuccess: (data) => {
        toast.success("Post deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: (error) => toast.error(error?.message),
    });

  const deletePostHandler = (slug) => {
    mutateDeletePost({ slug });
  };

  useEffect(() => {
    if (isFirstVisited) {
      isFirstVisited = false;
      return;
    }
    refetch();
  }, [refetch, currentPage]);

  return (
    <div className="flex h-full w-full flex-col px-10 py-6 text-dark-hard">
      <div className="my-5 flex flex-col items-center justify-between lg:my-2 lg:flex-row">
        <h2 className="text-2xl font-bold text-dark-soft">Dashboard</h2>
        {/* <div className="relative my-5 lg:my-0">
          <FiSearch className=" absolute left-2 top-[10px] h-5 w-5 text-[#959EAD] md:top-[12px]" />
          <input
            className="h-10 w-72 rounded-lg pl-10 pr-3 text-dark-hard shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] outline-none transition-all ease-linear placeholder:font-semibold focus:shadow-[rgba(13,_38,_200,_0.3)_0px_9px_20px] md:h-11 md:flex-1 md:pr-24"
            type="text"
            placeholder="Search here"
          />
        </div> */}
      </div>
      <div className="my-4 flex flex-col items-center gap-7 lg:flex-row lg:items-start">
        <div className="h-fit w-full rounded-lg bg-white px-5 py-5 shadow-md lg:w-96 lg:px-5 ">
          <h3 className="text-lg font-bold text-dark-soft">Comments</h3>
          <p className="text-sm text-dark-thin">
            You have{" "}
            <span className="font-semibold">{`${commentData?.comments?.length}`}</span>{" "}
            comments
          </p>
          <div className="my-4">
            {commentData &&
              commentData?.comments?.map((comment) => (
                <AdminCommentComponent key={comment?._id} comment={comment} />
              ))}
          </div>
          <div className="text-center">
            <Link to={"/admin/comments"}>
              <button className="w-full rounded-lg bg-blue-100 py-2.5 text-sm  font-semibold text-primary transition-all ease-linear hover:bg-blue-600 hover:text-white">
                View More
              </button>
            </Link>
          </div>
        </div>
        <div className="h-fit w-full rounded-lg bg-white px-5 py-5 shadow-md">
          <h3 className="text-lg font-bold text-dark-soft">Recent Posts</h3>
          <p className="text-sm text-dark-thin">
            View and edit your latest posts
          </p>
          <div className="my-5">
            {postData &&
              postData?.data?.posts?.map((post) => (
                <AdminPostComponent
                  key={post?.slug}
                  post={post}
                  deletePostHandler={deletePostHandler}
                />
              ))}
          </div>
          <div className="text-center">
            <Link to={"/admin/posts"}>
              <button className="w-full rounded-lg bg-blue-100 py-2.5 text-sm font-semibold text-primary transition-all ease-linear hover:bg-blue-600 hover:text-white lg:w-72">
                View More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
