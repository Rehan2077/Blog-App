import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiSearch } from "react-icons/fi";
import { MdDelete, MdRemoveRedEye } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import { images, stables } from "../../../constants";
import {
  deleteComment,
  getAllComments,
  updateComment,
} from "../../../services/index/comments";
import { formatDate } from "../../../utils/formatDate";

let isFirstVisited = true;

const AdminComments = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);

  const { userInfo } = useSelector((state) => state.user);
  const [filter, setFilter] = useState("");

  const {
    data: commentData,
    refetch: refetchComment,
    isLoading,
    isFetching,
  } = useQuery({
    queryFn: () =>
      getAllComments({ token: userInfo?.token, searchKeyword: filter }),
    queryKey: ["allComments"],
  });

  const { mutate: mutateDeleteComment, isLoading: isLoadingDeleteComment } =
    useMutation({
      mutationFn: ({ id }) => {
        return deleteComment({ commentId: id, token: userInfo?.token });
      },
      mutationKey: ["allComments"],
      onSuccess: (data) => {
        toast.success("Comment deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["allComments"] });
      },
      onError: (error) => toast.error(error?.message),
    });

  const deleteCommentHandler = (id) => {
    mutateDeleteComment({ id });
  };

  const { mutate: mutateToggleComment, isLoading: isLoadingToggleComment } =
    useMutation({
      mutationFn: ({ id }) => {
        return updateComment({
          commentId: id,
          token: userInfo.token,
          type: "toggle",
        });
      },
      mutationKey: ["allComments"],
      onSuccess: (data) => {
        toast.success("Comment updated successfully");
        queryClient.invalidateQueries({ queryKey: ["allComments"] });
      },
      onError: (error) => toast.error(error.message),
    });

  const toggleCommentHandler = (id) => {
    mutateToggleComment({ id });
  };

  const filterCommentHandler = (e) => {
    e.preventDefault();
    refetchComment();
    setFilter("");
  };

  useEffect(() => {
    if (isFirstVisited) {
      isFirstVisited = false;
      return;
    }
    refetchComment();
  }, [refetchComment, currentPage]);

  return (
    <div className="flex h-full w-full flex-col px-10 py-6 text-dark-hard">
      <div className="container">
        <div>
          <div className="mb-1 flex w-full flex-col items-center justify-between sm:mb-0 lg:flex-row">
            <h2 className="mb-3 text-2xl font-bold leading-tight text-dark-soft lg:mb-0">
              Manage Comments
            </h2>
            <form onSubmit={filterCommentHandler}>
              <div className="relative my-5 lg:my-0">
                <FiSearch className=" absolute left-2 top-[10px] h-5 w-5 text-[#959EAD] md:top-[12px]" />
                <input
                  className="h-10 w-72 rounded-lg pl-10 pr-3 text-dark-hard shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] outline-none transition-all ease-linear placeholder:font-semibold focus:shadow-[rgba(13,_38,_200,_0.3)_0px_9px_20px] md:h-11 md:flex-1 md:pr-24"
                  type="text"
                  placeholder="Filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="border-b border-gray-200 bg-white py-3 text-center text-sm uppercase text-gray-800 "
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="border-b border-gray-200 bg-white py-3 text-center text-sm uppercase text-gray-800 "
                    >
                      Comment
                    </th>
                    <th
                      scope="col"
                      className="border-b border-gray-200 bg-white py-3 text-center text-sm uppercase text-gray-800 "
                    >
                      Created at
                    </th>
                    <th
                      scope="col"
                      className="border-b border-gray-200 bg-white py-3 text-center text-sm uppercase text-gray-800 "
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading || isFetching ? (
                    <tr>
                      <td colSpan={5}>
                        <div className="w-full bg-white py-10 text-center text-lg font-semibold">
                          Loading...
                        </div>
                      </td>
                    </tr>
                  ) : !commentData?.comments ? (
                    <tr>
                      <td colSpan={5}>
                        <div className="w-full bg-white py-10 text-center text-lg font-semibold">
                          No comments...
                        </div>
                      </td>
                    </tr>
                  ) : (
                    commentData?.comments?.map((comment) => (
                      <tr key={comment?._id}>
                        <td className="border-b border-gray-200 bg-white pl-5 pr-3 text-start text-[0.85rem] lg:text-sm">
                          <div className="flex items-center">
                            <Link
                              to={`/article/${comment?.post?.slug}`}
                              className="relative block"
                            >
                              <div className="">
                                <img
                                  src={
                                    comment?.author?.avatar
                                      ? stables.UPLOAD_FOLDER_BASE_URL +
                                        comment.author.avatar
                                      : images.User
                                  }
                                  alt="article"
                                  className="h-10 w-12 rounded-lg object-cover"
                                />
                              </div>
                            </Link>
                            <div className="ml-3 lg:text-base">
                              <Link to={`/article/${comment?.post?.slug}`}>
                                <p className=" text-gray-900">
                                  {comment?.author?.name}
                                </p>
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-[0.85rem] lg:text-sm">
                          <Link to={`/article/${comment?.post?.slug}`}>
                            <p className="whitespace-no-wrap text-gray-900">
                              {comment?.desc}
                            </p>
                          </Link>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-[0.85rem] lg:text-sm">
                          <p className="whitespace-no-wrap text-gray-900">
                            {formatDate(comment?.createdAt)}
                          </p>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-[0.85rem] lg:text-sm">
                          <div
                            className={`flex justify-center gap-5 pr-4 text-lg text-dark-thin lg:text-xl xl:text-2xl`}
                          >
                            <MdDelete
                              onClick={() => deleteCommentHandler(comment?._id)}
                              className="transition-all ease-linear hover:cursor-pointer  hover:text-red-500"
                            />
                            <MdRemoveRedEye
                              onClick={() => toggleCommentHandler(comment?._id)}
                              className={`${
                                comment?.check === true
                                  ? "text-blue-500 hover:text-red-500"
                                  : "text-red-500 hover:text-blue-500"
                              } transition-all ease-linear `}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {!isLoading && (
                <Pagination
                  onPageChange={(page) => setCurrentPage(page)}
                  currentPage={currentPage}
                  totalPageCount={
                    1 || JSON.parse(postData?.headers?.["x-totalpagecount"])
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminComments;
