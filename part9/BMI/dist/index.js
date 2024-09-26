"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bmiCalculator_1 = require("./bmiCalculator");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});
app.get("/bmi", (req, res) => {
    const { height, weight } = req.query;
    if (!(0, utils_1.isNumber)(height) || !(0, utils_1.isNumber)(weight))
        return res.json({ error: "malformed parameters" });
    const { bmi, bmiDescription } = (0, bmiCalculator_1.bmiCalculator)(Number(height), Number(weight));
    return res.json({
        weight: Number(weight),
        height: Number(height),
        bmi,
        bmiDescription,
    });
});
const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
