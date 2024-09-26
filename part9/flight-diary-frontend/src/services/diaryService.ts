import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "@/types";

const BASE_URL = "http://localhost:3000/api/diaries";

const getAll = async () => {
  const response = await axios.get<DiaryEntry[]>(BASE_URL);
  return response.data;
};

const add = async (data: NewDiaryEntry) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

export default { getAll, add };
