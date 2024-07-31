import { useContext } from "react";
import NotificationContext from "../../contexts/NotificationContext.jsx";

export const useNotificationValue = () => {
  return useContext(NotificationContext)[0];
};

export const useDispatchNotification = () => {
  return useContext(NotificationContext)[1];
};
