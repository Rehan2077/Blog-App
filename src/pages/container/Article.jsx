import { FaArrowRight } from "react-icons/fa";

import ArticleCard from "../../components/ArticleCard";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/index/posts";
import toast from "react-hot-toast";
import ArticleCardSkeleton from "../../components/skeleton/ArticleCardSkeleton";
import { Link } from "react-router-dom";

const Article = () => {
  const { data, isLoading,  } = useQuery({
    queryFn: () => getAllPosts("", 8),
    queryKey: ["posts"],
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    },
  });

  return (
    <section className="container mx-auto flex flex-wrap px-5 md:gap-5 ">
      <div className="flex flex-wrap justify-center gap-x-7 gap-y-10 md:gap-x-10 xl:gap-x-7 2xl:justify-normal 2xl:gap-x-11">
        {isLoading
          ? [...Array(4)].map((_, i) => <ArticleCardSkeleton key={i} />)
          : data?.data?.posts?.map((post) => (
              <ArticleCard key={post._id} post={post} />
            ))}
      </div>
      <div className="m-10 flex w-full justify-center">
        <Link
          to={"/article"}
          className="flex w-max items-center gap-2 rounded-lg border-2 border-primary px-3 py-2 font-semibold text-primary transition-all ease-linear hover:border-transparent hover:bg-primary hover:text-white"
        >
          <span>More articles</span> <FaArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default Article;
