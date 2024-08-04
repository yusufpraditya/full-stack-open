import { createSlice } from "@reduxjs/toolkit";
import userService from "@/services/users.js";
import { setNotification } from "@/reducers/notificationReducer.js";

const userSlice = createSlice({
  name: "user",
  initialState: { loggedInUser: null, users: null },
  reducers: {
    setLoggedInUser(state, action) {
      return { ...state, loggedInUser: action.payload };
    },
    setUsers(state, action) {
      return { ...state, users: action.payload };
    },
    clearUser(state, action) {
      return { ...state, loggedInUser: null };
    },
    clearUsers(state, action) {
      return { ...state, users: null };
    },
  },
});

export const selectUserDetailById = (state, id) => {
  if (!state.user.users) return null;
  return state.user.users.find((user) => user.id === id);
};

const { setLoggedInUser, setUsers, clearUser, clearUsers } = userSlice.actions;

export const setSignedInUser = (user) => {
  return async (dispatch) => {
    dispatch(setLoggedInUser(user));
    window.localStorage.setItem("loggedInUser", JSON.stringify(user));
  };
};

export const initializeUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll();
      dispatch(setUsers(users));
    } catch (error) {
      console.error(error);
      dispatch(setNotification("error", error.message, 60));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(clearUser());
    dispatch(clearUsers());
  };
};

export default userSlice.reducer;
