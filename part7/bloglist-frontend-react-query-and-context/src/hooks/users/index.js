import { useContext } from "react";
import UserContext from "../../contexts/UserContext.jsx";

export const useUserValue = () => {
  return useContext(UserContext)[0].user;
};

export const useDispatchUser = () => {
  return useContext(UserContext)[1];
};
