import { Card, CardContent } from "@/components/ui/card.tsx";
import useGetDiaries from "@/hooks/useGetDiaries.ts";
import { Loader2 } from "lucide-react";

const Diaries = () => {
  const diariesQuery = useGetDiaries();

  if (diariesQuery.isLoading)
    return (
      <Card>
        <div className="flex items-center gap-2">
          <Loader2 className="size-4 animate-spin" /> <span>Loading..</span>
        </div>
      </Card>
    );

  if (diariesQuery.isError)
    return (
      <Card>
        <div>An error occurred</div>
      </Card>
    );

  return (
    <Card>
      <CardContent className="grid grid-cols-2 gap-2">
        {diariesQuery.data &&
          diariesQuery.data.map((diary) => {
            return (
              <div className="justify-self-center">
                <b>{diary.date}</b>
                <div>visibility: {diary.visibility}</div>
                <div>weather: {diary.weather}</div>
              </div>
            );
          })}
      </CardContent>
    </Card>
  );
};

export default Diaries;
