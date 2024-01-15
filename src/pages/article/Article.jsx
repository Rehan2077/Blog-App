import ArticleCard from "../../components/ArticleCard";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/index/posts";
import toast from "react-hot-toast";
import ArticleCardSkeleton from "../../components/skeleton/ArticleCardSkeleton";
import { useEffect } from "react";

const Article = () => {
  const { data, isLoading, isError } = useQuery({
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

  if (isError) {
    return null;
  }

  return (
    <section className="container mx-auto flex flex-wrap p-5 md:gap-5">
      <div className="flex flex-wrap justify-center gap-x-7 gap-y-10 md:gap-x-10 xl:gap-x-7 2xl:justify-normal 2xl:gap-x-11">
        {isLoading
          ? Array.from({ length: 4 }, (_, i) => <ArticleCardSkeleton key={i} />)
          : data?.data?.posts.length > 0 &&
            data?.data?.posts.map((post) => (
              <ArticleCard key={post._id} post={post} />
            ))}
      </div>
    </section>
  );
};

export default Article;
