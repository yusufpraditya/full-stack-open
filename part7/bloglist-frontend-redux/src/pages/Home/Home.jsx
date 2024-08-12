import { useRef } from "react";
import { useSelector } from "react-redux";

import BlogList from "./BlogList.jsx";
import LoginForm from "./LoginForm.jsx";
import BlogForm from "./BlogForm.jsx";

import Togglable from "@/components/Togglable.jsx";

const Home = ({ loginInfo, setLoginInfo, setIsClicked }) => {
  const user = useSelector((state) => state.user.loggedInUser);

  const blogRef = useRef(null);

  return (
    <div className="flex justify-center">
      <div className="p-4 border-2 shadow-lg rounded-lg flex flex-col items-center">
        {user === null && (
          <LoginForm
            loginInfo={loginInfo}
            setLoginInfo={setLoginInfo}
            setIsClicked={setIsClicked}
          />
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
    </div>
  );
};

export default Home;
