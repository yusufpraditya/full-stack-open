import diaryService from "@/services/diaryService.ts";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useGetDiaries = () => {
  return useMutation({
    mutationFn: diaryService.add,
    retry: false,
    onError: (error) => {
      toast.error(error.message || "Failed to add a new diary");
    },
    onSuccess: () => {
      toast.success("A new diary has been added");
    },
  });
};

export default useGetDiaries;
