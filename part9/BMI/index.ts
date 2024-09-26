import express from "express";
import { bmiCalculator } from "./bmiCalculator";
import { isNumber } from "./utils";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!isNumber(height) || !isNumber(weight))
    return res.status(400).json({ error: "malformed parameters" });

  const { bmi, bmiDescription } = bmiCalculator(Number(height), Number(weight));

  return res.json({
    weight: Number(weight),
    height: Number(height),
    bmi,
    bmiDescription,
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dailyExercises, target } = req.body;

  if (!dailyExercises || !target)
    return res.status(400).json({ error: "parameters missing" });

  if (!Array.isArray(dailyExercises) || !isNumber(target))
    return res.status(400).json({ error: "malformed parameters" });

  const hasNonNumber = dailyExercises.some((hour) => !isNumber(hour));

  if (hasNonNumber)
    return res.status(400).json({ error: "malformed parameters" });

  const result = calculateExercises(
    dailyExercises as number[],
    target as number,
  );

  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
