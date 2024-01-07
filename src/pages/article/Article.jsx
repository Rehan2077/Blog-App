import ArticleCard from "../../components/ArticleCard";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/index/posts";
import toast from "react-hot-toast";
import ArticleCardSkeleton from "../../components/skeleton/ArticleCardSkeleton";
import { useEffect } from "react";

const Article = () => {
  const { data, isLoading } = useQuery({
    queryFn: () => getAllPosts("", 20),
    queryKey: ["posts"],
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    },
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

  return (
    <section className="container mx-auto flex flex-wrap p-5 md:gap-5">
      <div className="flex flex-wrap justify-center gap-x-7 gap-y-10 md:gap-x-10 xl:gap-x-7 2xl:justify-normal 2xl:gap-x-11">
        {isLoading
          ? [...Array(4)].map((_, i) => <ArticleCardSkeleton key={i} />)
          : data?.data?.posts.map((post) => (
              <ArticleCard key={post._id} post={post} />
            ))}
      </div>
      {/* <div className="w-full m-10 flex justify-center">
        <button className="flex w-max px-3 py-2 border-2 border-primary hover:border-transparent hover:bg-primary hover:text-white transition-all ease-linear items-center gap-2 text-primary font-semibold rounded-lg">
          <span>More articles</span> <FaArrowRight />
        </button>
      </div> */}
    </section>
  );
};

export default Article;
