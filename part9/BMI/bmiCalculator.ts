import { isNumber } from "./utils";

interface Units {
  weight: number;
  height: number;
}

interface Result {
  bmi: number;
  bmiDescription: string;
}

const parseArguments = (args: string[]): Units => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (isNumber(args[2]) && isNumber(args[3])) {
    return {
      weight: Number(args[2]),
      height: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const getBMICategory = (bmi: number): string => {
  switch (true) {
    case bmi < 16.0:
      return "Underweight (Severe thinness)";
    case bmi >= 16.0 && bmi <= 16.9:
      return "Underweight (Moderate thinness)";
    case bmi >= 17.0 && bmi <= 18.4:
      return "Underweight (Mild thinness)";
    case bmi >= 18.5 && bmi <= 24.9:
      return "Normal range";
    case bmi >= 25.0 && bmi <= 29.9:
      return "Overweight (Pre-obese)";
    case bmi >= 30.0 && bmi <= 34.9:
      return "Obese (Class I)";
    case bmi >= 35.0 && bmi <= 39.9:
      return "Obese (Class II)";
    case bmi >= 40.0:
      return "Obese (Class III)";
    default:
      return "Invalid BMI";
  }
};

export const bmiCalculator = (height: number, weight: number): Result => {
  const bmi = weight / (height / 100) ** 2;

  const bmiDescription = getBMICategory(bmi);

  return { bmi, bmiDescription };
};

if (require.main === module) {
  try {
    const { weight, height } = parseArguments(process.argv);

    console.log(bmiCalculator(weight, height));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
