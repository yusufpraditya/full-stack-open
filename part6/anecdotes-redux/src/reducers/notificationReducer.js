import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    content: null,
    timeoutId: null
  },
  reducers: {
    setContent(state, action) {
      return {...state, content: action.payload};
    },
    removeContent(state, action) {
      return {...state, content: null};;
    },
    setTimeoutId(state, action) {
      return {...state, timeoutId: action.payload};
    },
    removeTimeoutId(state, action) {
      return {...state, timeoutId: null};;
    }
  },
});

export const setNotification = (content, delayInSeconds) => {
  const { setContent, removeContent, setTimeoutId, removeTimeoutId } = notificationSlice.actions;

  return async (dispatch, getState) => {
    const state = getState().notification;

    dispatch(setContent(content));

    if (state.timeoutId) {
      clearTimeout(state.timeoutId);
      dispatch(removeTimeoutId(state.timeoutId));
    }

    const timeoutId = setTimeout(() => {
      dispatch(removeContent());
    }, delayInSeconds * 1000);

    dispatch(setTimeoutId(timeoutId));
  };
};

export default notificationSlice.reducer;
