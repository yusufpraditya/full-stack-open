import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import blogService from "../../services/blogs.js";

export const useBlogsQuery = () => {
  return useQuery({
    queryKey: ["blogList"],
    queryFn: blogService.getAll,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useAddBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogService.add,
    onSuccess: (result, variables) => {
      queryClient.setQueryData(["blogList"], (oldData) => {
        const newData = {
          ...result.data,
          creator: {
            id: result.data.creator,
            name: variables.user.name,
            username: variables.user.username,
          },
        };
        return oldData.concat(newData);
      });
    },
  });
};

export const useLikeBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogService.update,
    onSuccess: (result) => {
      queryClient.setQueryData(["blogList"], (oldData) => {
        const blogLikes = result.data.likes;
        return [...oldData].map((b) => {
          if (b.id === result.data.id) return { ...b, likes: blogLikes };
          else return b;
        });
      });
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogService.remove,
    onSuccess: (result, variables) => {
      queryClient.setQueryData(["blogList"], (oldData) => {
        return [...oldData].filter((b) => b.id !== variables.blogId);
      });
    },
  });
};
