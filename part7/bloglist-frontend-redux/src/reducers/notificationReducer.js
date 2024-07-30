import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { content: null, timeoutId: null },
  reducers: {
    setContent(state, action) {
      return { ...state, content: action.payload };
    },
    clearContent(state, action) {
      return { ...state, content: null };
    },
    setTimeoutId(state, action) {
      return { ...state, timeoutId: action.payload };
    },
    clearTimeoutId(state, action) {
      return { ...state, timeoutId: null };
    },
  },
});

const { setContent, clearContent, setTimeoutId, clearTimeoutId } =
  notificationSlice.actions;

export const setNotification = (type, message, delayInSeconds = 3) => {
  return async (dispatch, getState) => {
    const state = getState().notification;

    const content = {
      type,
      message,
    };

    dispatch(setContent(content));

    if (state.timeoutId) {
      clearTimeout(state.timeoutId);
      dispatch(clearTimeoutId());
    }

    const timeoutId = setTimeout(() => {
      dispatch(clearContent());
    }, delayInSeconds * 1000);

    dispatch(setTimeoutId(timeoutId));
  };
};

export default notificationSlice.reducer;
