import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser(state, action) {
      return null;
    },
  },
});

const { setUser, clearUser } = userSlice.actions;

export const setSignedInUser = (user) => {
  return async (dispatch) => {
    dispatch(setUser(user));
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(clearUser());
  };
};

export default userSlice.reducer;
