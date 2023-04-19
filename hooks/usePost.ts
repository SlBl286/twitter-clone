import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const usePost = (postId?: number) => {
  const url = postId ? `/api/posts?postId=${postId}` : null;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePost;
