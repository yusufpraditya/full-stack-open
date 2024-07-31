/* eslint-disable */
const notificationReducer = (state, action) => {
  switch (action.type) {
    case "setMessage":
      return { ...state, message: action.payload };
    case "clearMessage":
      return { ...state, message: null };
    case "setTimeoutId":
      return { ...state, timeoutId: action.payload };
    case "clearTimeoutId":
      return { ...state, timeoutId: null };
    case "setIsError":
      return { ...state, error: action.payload };
  }
};

export const sendNotification = (
  { dispatch, notification },
  message,
  isError = false,
  delayInSeconds = 3,
) => {
  if (isError) {
    dispatch({
      type: "setIsError",
      payload: true,
    });
  } else {
    dispatch({
      type: "setIsError",
      payload: false,
    });
  }

  dispatch({
    type: "setMessage",
    payload: message,
  });

  if (notification.timeoutId) {
    clearTimeout(notification.timeoutId);
    dispatch({
      type: "clearTimeoutId",
    });
  }

  const timeoutId = setTimeout(() => {
    dispatch({
      type: "clearMessage",
    });
  }, delayInSeconds * 1000);

  dispatch({
    type: "setTimeoutId",
    payload: timeoutId,
  });
};

export default notificationReducer;
