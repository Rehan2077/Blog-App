import ArticleCard from "../../components/ArticleCard";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/index/posts";
import toast from "react-hot-toast";
import ArticleCardSkeleton from "../../components/skeleton/ArticleCardSkeleton";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { PostCategories } from "../../utils/categoryTypes";

const Article = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search");
  const categoryParam = queryParams.get("category");

  const categories = PostCategories;
  const [category, setCategory] = useState(categoryParam || "All");

  const [filter, setFilter] = useState(search || "");

  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    },
  });

  const [categoryPosts, setCategoryPosts] = useState([]);

  const updateCategoryPosts = (category) => {
    if (category === "All" || undefined) {
      setCategoryPosts(data?.data?.posts);
    } else {
      const filteredPosts = data?.data?.posts?.filter(
        (post) => post.categories[0] === category,
      );
      setCategoryPosts(filteredPosts);
    }
  };

  const filterPostHandler = (e) => {
    e.preventDefault();
    refetch();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const updateParam = (value, param) => {
    const url = new URL(window.location.href);
    url.searchParams.set(param, value);
    window.history.pushState({}, "", url);
  };

  useEffect(() => {
    scrollToTop();
  });

  useEffect(() => {
    updateCategoryPosts(category);
  }, [category]);

  if (isError) {
    return null;
  }

  return (
    <section className="container mx-auto flex flex-col flex-wrap p-5 md:gap-5">
      <div className="flex items-center justify-between px-1">
        {/* <form onSubmit={filterPostHandler} className="flex"> */}
        <div className="relative my-5 lg:my-0">
          <FiSearch className=" absolute left-2 top-[10px] h-5 w-5 text-[#959EAD] md:top-[12px]" />
          <input
            className="h-10 w-72 rounded-lg pl-10 pr-3 text-dark-hard shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] outline-none transition-all ease-linear placeholder:font-semibold focus:shadow-[rgba(13,_38,_200,_0.3)_0px_9px_20px] md:h-11 md:flex-1 md:pr-24"
            type="text"
            placeholder="Search here"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        {/* </form> */}
        <div className="mr-5">
          <label
            htmlFor="category"
            className="mr-1 pl-0.5 font-semibold text-dark-soft"
          >
            Select Category:
          </label>
          <select
            onChange={(e) => {
              setCategory(e.target.value);
              updateParam(e.target.value, "category");
              updateCategoryPosts(e.target.value);
            }}
            value={category}
            name="category"
            id="category"
            className="mb-2 rounded-lg border-2 border-slate-300 p-2"
          >
            <option value={"All"}>All</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-7 gap-y-10 md:gap-x-10 xl:gap-x-7 2xl:justify-normal 2xl:gap-x-11">
        {isLoading
          ? Array.from({ length: 4 }, (_, i) => <ArticleCardSkeleton key={i} />)
          : categoryPosts
              ?.filter((post) =>
                filter
                  ? post.title.toLowerCase().includes(filter.toLowerCase())
                  : post,
              )
              .map((post) => <ArticleCard key={post._id} post={post} />)}
      </div>
    </section>
  );
};

export default Article;
