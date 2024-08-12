import Home from "@/pages/Home";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Users from "@/pages/Users/index.js";
import User from "@/pages/Users/User/index.js";
import Blog from "@/pages/Home/Blog.jsx";
import BlogList from "@/pages/Home/BlogList.jsx";
import { initializeBlogs } from "@/reducers/blogReducer.js";
import { initializeUsers, setSignedInUser } from "@/reducers/userReducer.js";
import { useLocalStorage } from "@/hooks/useLocalStorage.js";
import Notification from "@/components/Notification.jsx";

import "@/index.css";

const App = () => {
  const user = useSelector((state) => state.user.loggedInUser);
  const notification = useSelector((state) => state.notification);
  const userFromLocalStorage = useLocalStorage("loggedInUser");

  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const [isClicked, setIsClicked] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
    dispatch(setSignedInUser(userFromLocalStorage));
  }, []);

  return (
    <div className="relative h-screen">
      {user !== null && <Navbar setLoginInfo={setLoginInfo} />}

      {notification.content && isClicked && (
        <Notification notification={notification.content} />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              loginInfo={loginInfo}
              setLoginInfo={setLoginInfo}
              setIsClicked={setIsClicked}
            />
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  );
};

export default App;
