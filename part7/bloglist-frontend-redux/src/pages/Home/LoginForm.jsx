import authService from "../../services/auth.js";
import {
  clearNotification,
  setNotification,
} from "@/reducers/notificationReducer.js";
import { useDispatch } from "react-redux";
import { initializeUsers, setSignedInUser } from "@/reducers/userReducer.js";
import Button from "@/components/Button.jsx";
import { initializeBlogs } from "@/reducers/blogReducer.js";
import { useRef } from "react";

const LoginForm = ({ loginInfo, setLoginInfo, setIsClicked }) => {
  const dispatch = useDispatch();

  const timeoutRef = useRef(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsClicked(false);

    timeoutRef.current = setTimeout(() => {
      setIsClicked(true);
    }, 100);

    try {
      const user = await authService.login(
        loginInfo.username,
        loginInfo.password,
      );

      dispatch(clearNotification());
      dispatch(setSignedInUser(user));
      dispatch(initializeBlogs());
      dispatch(initializeUsers());
    } catch (error) {
      if (error.message.includes("401"))
        dispatch(setNotification("error", "Username or password is incorrect"));
      else dispatch(setNotification("error", error.message));
    }
  };

  const handleUsernameChange = ({ target }) => {
    setLoginInfo({ ...loginInfo, username: target.value });
  };

  const handlePasswordChange = ({ target }) => {
    setLoginInfo({ ...loginInfo, password: target.value });
  };

  return (
    <>
      <h2 className="font-medium mb-2">Login</h2>
      <form className="flex flex-col" onSubmit={handleFormSubmit}>
        <div className="flex justify-between items-center gap-2">
          <label htmlFor="username">Username </label>
          <input
            type="text"
            id="username"
            className="outline-0 border-2 p-1 mb-2"
            placeholder="username"
            autoComplete="off"
            value={loginInfo.username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="flex justify-between items-center gap-2">
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            className="outline-0 border-2 p-1 mb-2"
            placeholder="password"
            value={loginInfo.password}
            onChange={handlePasswordChange}
          />
        </div>
        <Button className="w-full">Login</Button>
      </form>
    </>
  );
};

export default LoginForm;
