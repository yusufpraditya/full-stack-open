import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Diaries from "@/components/Diaries.tsx";
import NewDiary from "@/components/NewDiary.tsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="flex justify-center h-dvh mt-4">
      <Toaster position="bottom-right" />
      <Tabs defaultValue="diaries" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="diaries">Diary entries</TabsTrigger>
          <TabsTrigger value="addDiary">Add new entry</TabsTrigger>
        </TabsList>
        <TabsContent value="diaries">
          <Diaries />
        </TabsContent>
        <TabsContent value="addDiary">
          <NewDiary />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default App;
