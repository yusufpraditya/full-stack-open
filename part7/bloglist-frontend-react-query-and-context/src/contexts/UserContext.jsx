import { createContext, useReducer } from "react";
import userReducer from "../reducers/userReducer.js";

const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, dispatchUser] = useReducer(userReducer, { user: null });

  return (
    <UserContext.Provider value={[user, dispatchUser]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
