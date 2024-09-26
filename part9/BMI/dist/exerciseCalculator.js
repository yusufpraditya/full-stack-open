"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const calculateRating = (averageHours, targetDailyHours) => {
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
const calculateExercises = (dailyExerciseHours, targetDailyHours) => {
    const averageHours = dailyExerciseHours.reduce((prev, curr) => prev + curr) /
        dailyExerciseHours.length;
    const trainingDays = dailyExerciseHours.reduce((prev, curr) => {
        if (curr > 0)
            return prev + 1;
        return prev;
    }, 0);
    const { rating, ratingDescription } = calculateRating(averageHours, targetDailyHours);
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
const parseArguments = (args) => {
    if (args.length < 4)
        throw new Error("Not enough arguments");
    return args.slice(2).map((arg) => {
        if (!(0, utils_1.isNumber)(arg))
            throw new Error("Provided values were not numbers!");
        return Number(arg);
    });
};
try {
    const [targetDailyHours, ...dailyExerciseHours] = parseArguments(process.argv);
    console.log(calculateExercises(dailyExerciseHours, targetDailyHours));
}
catch (error) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}
