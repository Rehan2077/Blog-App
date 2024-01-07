import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { images, stables } from "../../../constants";
import { getAllPosts } from "../../../services/index/posts";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "../../../utils/formatDate";

const AdminPosts = () => {
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

  const filterPostHandler = (e) => {
    e.preventDefault();
    refetch();
    setFilter("");
    setCurrentPage(1);
  };

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
                          <a
                            href="/"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <div className="xs:flex-row xs:justify-between flex flex-col items-center bg-white px-5 py-5">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="w-full rounded-l-xl border bg-white p-4 text-base text-gray-600 hover:bg-gray-100"
                  >
                    <svg
                      width="9"
                      fill="currentColor"
                      height="8"
                      className=""
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="w-full border-b border-t bg-white px-4 py-2 text-base text-indigo-500 hover:bg-gray-100 "
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className="w-full border bg-white px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
                  >
                    2
                  </button>
                  <button
                    type="button"
                    className="w-full border-b border-t bg-white px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
                  >
                    3
                  </button>
                  <button
                    type="button"
                    className="w-full border bg-white px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
                  >
                    4
                  </button>
                  <button
                    type="button"
                    className="w-full rounded-r-xl border-b border-r border-t bg-white p-4 text-base text-gray-600 hover:bg-gray-100"
                  >
                    <svg
                      width="9"
                      fill="currentColor"
                      height="8"
                      className=""
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPosts;
