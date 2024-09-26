import express, { NextFunction, Request, Response } from "express";
import patients from "../data/patients";
import { Patients } from "../types";
import patientService from "../services/patientService";
import { NewPatientSchema } from "../utils";

const router = express.Router();

router.get("/", (_req, res: Response<Omit<Patients, "ssn">[]>) => {
  return res.json(patients.map(({ ssn: _ssn, ...rest }) => rest));
});

router.post(
  "/",
  (req: Request, res: Response, next: NextFunction): Response | void => {
    try {
      const newPatient = NewPatientSchema.parse(req.body);

      const addedPatient = patientService.addPatient(newPatient);
      return res.json(addedPatient);
    } catch (error: unknown) {
      next(error);
    }
  },
);

export default router;
