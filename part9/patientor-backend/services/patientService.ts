import { NewPatient, Patients } from "../types";
import { v1 as uuid } from "uuid";
import patients from "../data/patients";

const addPatient = (patient: NewPatient): Patients => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);

  return newPatient;
};

export default { addPatient };
