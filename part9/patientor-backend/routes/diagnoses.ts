import express, { Response } from "express";
import diagnoses from "../data/diagnoses";
import { Diagnosis } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  return res.json(diagnoses);
});

export default router;
