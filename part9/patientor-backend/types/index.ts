export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patients {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type NewPatient = Omit<Patients, "id">;

export enum Gender {
  Male = "male",
  Female = "female",
}
