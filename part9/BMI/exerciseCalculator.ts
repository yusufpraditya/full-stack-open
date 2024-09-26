import { isNumber } from "./utils";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Rating {
  rating: number;
  ratingDescription: string;
}

const calculateRating = (
  averageHours: number,
  targetDailyHours: number,
): Rating => {
  const value = averageHours / targetDailyHours;
  if (value >= 1)
    return {
      rating: 3,
      ratingDescription: "very good",
    };

  return value > 0.7
    ? { rating: 2, ratingDescription: "not bad" }
    : { rating: 1, ratingDescription: "bad" };
};

export const calculateExercises = (
  dailyExerciseHours: number[],
  targetDailyHours: number,
): Result => {
  const averageHours =
    dailyExerciseHours.reduce((prev, curr) => prev + curr) /
    dailyExerciseHours.length;

  const trainingDays = dailyExerciseHours.reduce((prev, curr) => {
    if (curr > 0) return prev + 1;
    return prev;
  }, 0);

  const { rating, ratingDescription } = calculateRating(
    averageHours,
    targetDailyHours,
  );

  return {
    periodLength: dailyExerciseHours.length,
    trainingDays,
    success: averageHours >= targetDailyHours,
    rating,
    ratingDescription,
    target: targetDailyHours,
    average: averageHours,
  };
};

const parseArguments = (args: string[]): number[] => {
  if (args.length < 4) throw new Error("Not enough arguments");

  return args.slice(2).map((arg) => {
    if (!isNumber(arg)) throw new Error("Provided values were not numbers!");
    return Number(arg);
  });
};

if (require.main === module) {
  try {
    const [targetDailyHours, ...dailyExerciseHours] = parseArguments(
      process.argv,
    );

    console.log(calculateExercises(dailyExerciseHours, targetDailyHours));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
