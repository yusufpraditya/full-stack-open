import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { initializeBlogs } from "./reducers/blogReducer";
import { setSignedInUser, logoutUser } from "./reducers/userReducer.js";

import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import "./App.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const blogRef = useRef(null);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const userJson = window.localStorage.getItem("user");
    const user = JSON.parse(userJson);

    dispatch(setSignedInUser(user));
  }, []);

  const handleLogoutButton = () => {
    window.localStorage.removeItem("user");

    dispatch(logoutUser());
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      {notification.content && (
        <Notification notification={notification.content} />
      )}
      {user === null && (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}

      {user !== null && (
        <>
          <p>
            {user.name} logged in{" "}
            <button onClick={handleLogoutButton}>Logout</button>
          </p>

          <Togglable buttonLabel="New blog" ref={blogRef}>
            <BlogForm blogRef={blogRef} />
          </Togglable>

          <BlogList />
        </>
      )}
    </div>
  );
};

export default App;
