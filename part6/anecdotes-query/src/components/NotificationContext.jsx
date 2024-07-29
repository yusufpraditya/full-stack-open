import { useContext, createContext, useReducer, useRef } from "react";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return action.payload;
    case "CLEAR_MESSAGE":
      return null;
  }
};

export const sendNotification = (dispatch, timeoutRef, message) => {
  dispatch({ type: "SET_MESSAGE", payload: message });

  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }

  timeoutRef.current = setTimeout(() => {
    dispatch({
      type: "CLEAR_MESSAGE",
    });
  }, 5000);
};

export const useNotificationValue = () => {
  const { notification } = useContext(NotificationContext);

  return notification;
};

export const useDispatchNotification = () => {
  const { notificationDispatch } = useContext(NotificationContext);

  return notificationDispatch;
};

export const useTimeoutRef = () => {
  const { timeoutRef } = useContext(NotificationContext);

  return timeoutRef;
};

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  const timeoutRef = useRef(null);

  return (
    <NotificationContext.Provider
      value={{ notification, notificationDispatch, timeoutRef }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};
