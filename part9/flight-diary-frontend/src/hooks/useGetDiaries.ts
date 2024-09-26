import { useQuery } from "@tanstack/react-query";
import diaryService from "@/services/diaryService.ts";

const useGetDiaries = () => {
  return useQuery({
    queryKey: ["diaries"],
    queryFn: diaryService.getAll,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetDiaries;
