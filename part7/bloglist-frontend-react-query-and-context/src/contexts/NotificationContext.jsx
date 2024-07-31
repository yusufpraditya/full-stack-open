import { createContext, useReducer } from "react";
import notificationReducer from "../reducers/notificationReducer";

const NotificationContext = createContext(null);

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    message: null,
    timeoutId: null,
  });

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
