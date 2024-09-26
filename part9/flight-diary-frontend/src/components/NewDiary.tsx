import { Card, CardContent } from "@/components/ui/card.tsx";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar.tsx";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input.tsx";
import { Visibility, Weather } from "@/types";
import toast from "react-hot-toast";
import useAddDiary from "@/hooks/useAddDiary.ts";
import { z } from "zod";

const NewDiary = () => {
  const [date, setDate] = useState<Date>();
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const addDiary = useAddDiary();

  const handleFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const missingFields: string[] = [];

    if (!date) missingFields.push("date");
    if (!visibility) missingFields.push("visibility");
    if (!weather) missingFields.push("weather");
    if (!comment) missingFields.push("comment");

    if (missingFields.length >= 1) {
      toast.error(`Missing fields: ${missingFields.join(", ")}`);
      return;
    }

    try {
      const newDiarySchema = z.object({
        date: z.string().date(),
        visibility: z.nativeEnum(Visibility),
        weather: z.nativeEnum(Weather),
        comment: z.string(),
      });

      addDiary.mutate(
        newDiarySchema.parse({
          date: format(date!, "yyyy-MM-dd"),
          visibility: visibility.toLowerCase(),
          weather: weather.toLowerCase(),
          comment,
        }),
      );
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const zodError = error.issues.map((issue) => issue.message);
        toast.error(zodError.join("\n"));
      }
    }
  };

  const handleVisibility = (value: string) => {
    setVisibility(value);
  };

  const handleWeather = (value: string) => {
    setWeather(value);
  };

  const handleComment = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  return (
    <Card className="p-2">
      <CardContent>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
          <div>
            <div className="font-semibold">Date</div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <div className="font-semibold">Visibility</div>
            <RadioGroup
              className="grid grid-cols-2"
              onValueChange={handleVisibility}
            >
              {Object.keys(Visibility).map((visibility) => {
                return (
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={visibility} id={visibility} />
                    <Label htmlFor={visibility}>{visibility}</Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
          <div>
            <div className="font-semibold">Weather</div>
            <RadioGroup
              className="grid grid-cols-2"
              onValueChange={handleWeather}
            >
              {Object.keys(Weather).map((weather) => {
                return (
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={weather} id={weather} />
                    <Label htmlFor={weather}>{weather}</Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
          <div>
            <div className="font-semibold">Comment</div>
            <Input
              type="text"
              placeholder="Add your comment.."
              onChange={handleComment}
            />
          </div>
          <Button className="mt-2">Add</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewDiary;
