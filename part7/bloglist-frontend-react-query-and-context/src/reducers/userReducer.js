/* eslint-disable */
const userReducer = (state, action) => {
  switch (action.type) {
    case "setUser":
      return { ...state, user: action.payload };
    case "clearUser":
      return { ...state, user: null };
  }
};

export const setSignedInUser = (dispatch, user) => {
  dispatch({ type: "setUser", payload: user });
};

export const logoutUser = (dispatch) => {
  dispatch({ type: "clearUser" });
};

export default userReducer;
