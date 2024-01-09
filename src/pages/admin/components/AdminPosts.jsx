import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { images, stables } from "../../../constants";
import { deletePost, getAllPosts } from "../../../services/index/posts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "../../../utils/formatDate";
import Pagination from "../../../components/Pagination";
import toast from "react-hot-toast";
import { MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";

let isFirstVisited = true;

const AdminPosts = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: postData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryFn: () => getAllPosts(filter, 10, currentPage),
    queryKey: ["posts"],
  });

  const { mutate: mutateDeletePost, isLoading: isLoadingDeletePost } =
    useMutation({
      mutationFn: ({ slug }) => {
        return deletePost(slug);
      },
      mutationKey: ["comments"],
      onSuccess: (data) => {
        toast.success("Post deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: (error) => toast.error(error.message),
    });

  const deletePostHandler = (slug) => {
    mutateDeletePost({slug});
  };

  const filterPostHandler = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setFilter("");
    refetch();
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
      <div className="container">
        <div>
          <div className="mb-1 flex w-full flex-col items-center justify-between sm:mb-0 lg:flex-row">
            <h2 className="text-2xl font-bold leading-tight text-dark-soft">
              Manage Posts
            </h2>
            <div className="text-end">
              <form onSubmit={filterPostHandler}>
                <div className="relative my-5 lg:my-0">
                  <FiSearch className=" absolute left-2 top-[10px] h-5 w-5 text-[/959EAD] md:top-[12px]" />
                  <input
                    className="h-10 w-72 rounded-lg pl-10 pr-3 text-dark-hard shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] outline-none transition-all ease-linear placeholder:font-semibold focus:shadow-[rgba(13,_38,_200,_0.3)_0px_9px_20px] md:h-11 md:flex-1 md:pr-24"
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Filter"
                  />
                </div>
              </form>
            </div>
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
                      Title
                    </th>
                    <th
                      scope="col"
                      className="border-b border-gray-200 bg-white py-3 text-center text-sm uppercase text-gray-800 "
                    >
                      Category
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
                      Views
                    </th>
                    <th
                      scope="col"
                      className="border-b border-gray-200 bg-white py-3 text-center text-sm uppercase text-gray-800 "
                    ></th>
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
                  ) : postData?.data?.posts.length === 0 ? (
                    <tr>
                      <td colSpan={5}>
                        <div className="w-full bg-white py-10 text-center text-lg font-semibold">
                          No such posts...
                        </div>
                      </td>
                    </tr>
                  ) : (
                    postData?.data?.posts?.map((post) => (
                      <tr key={post?._id}>
                        <td className="border-b border-gray-200 bg-white pl-5 pr-3 text-start text-[0.85rem] lg:text-sm">
                          <div className="flex items-center">
                            <Link
                              to={`/article/${post?.slug}`}
                              className="relative block"
                            >
                              <div className="">
                                <img
                                  src={
                                    post?.photo
                                      ? stables.UPLOAD_FOLDER_BASE_URL +
                                        post.photo
                                      : images.PostPlaceholder
                                  }
                                  alt="article"
                                  className="h-10 w-12 rounded-lg object-cover"
                                />
                              </div>
                            </Link>
                            <div className="ml-3 lg:text-base">
                              <Link to={`/article/${post?.slug}`}>
                                <p className=" text-gray-900">{post?.title}</p>
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-[0.85rem] lg:text-sm">
                          <p className="whitespace-no-wrap text-gray-900">
                            {post?.category}
                          </p>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-[0.85rem] lg:text-sm">
                          <p className="whitespace-no-wrap text-gray-900">
                            {formatDate(post?.createdAt)}
                          </p>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-[0.85rem] lg:text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 rounded-full bg-green-200 opacity-50"
                            ></span>
                            <span className="relative">{post?.views}</span>
                          </span>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-[0.85rem] lg:text-sm">
                          <div
                            className={`flex justify-center gap-5 pr-4 text-lg text-dark-thin lg:text-xl xl:text-2xl`}
                          >
                            <MdDelete onClick={()=>deletePostHandler(post?.slug)} className="transition-all ease-linear hover:cursor-pointer  hover:text-red-500" />
                            <MdEdit className="transition-all ease-linear hover:cursor-pointer  hover:text-green-500" />
                            <MdRemoveRedEye className="transition-all ease-linear hover:cursor-pointer  hover:text-blue-500" />
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
                  totalPageCount={JSON.parse(
                    postData?.headers?.["x-totalpagecount"],
                  )}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPosts;
