import { useRef } from "react";
import { useSelector } from "react-redux";

import BlogList from "./BlogList.jsx";
import LoginForm from "./LoginForm.jsx";
import BlogForm from "./BlogForm.jsx";

import Togglable from "@/components/Togglable.jsx";

import "@/App.css";

const Home = ({ loginInfo, setLoginInfo }) => {
  const user = useSelector((state) => state.user.loggedInUser);

  const blogRef = useRef(null);

  return (
    <div>
      {user === null && (
        <LoginForm loginInfo={loginInfo} setLoginInfo={setLoginInfo} />
      )}

      {user !== null && (
        <>
          <Togglable buttonLabel="New blog" ref={blogRef}>
            <BlogForm blogRef={blogRef} />
          </Togglable>

          <BlogList />
        </>
      )}
    </div>
  );
};

export default Home;
