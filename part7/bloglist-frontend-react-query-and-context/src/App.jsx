import { useState, useEffect, useRef, useContext } from "react";

import { sendNotification } from "./reducers/notificationReducer.js";
import { logoutUser, setSignedInUser } from "./reducers/userReducer.js";

import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import {
  useDispatchNotification,
  useNotificationValue,
} from "./hooks/notification/index.js";
import {
  useAddBlog,
  useBlogsQuery,
  useDeleteBlog,
  useLikeBlog,
} from "./hooks/blogs/index.js";

import "./App.css";
import { useDispatchUser, useUserValue } from "./hooks/users/index.js";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const blogRef = useRef(null);

  const notification = useNotificationValue();
  const notificationDispatch = useDispatchNotification();
  const user = useUserValue();
  const userDispatch = useDispatchUser();

  const result = useBlogsQuery();
  const addBlogMutation = useAddBlog();
  const likeBlogMutation = useLikeBlog();
  const deleteBlogMutation = useDeleteBlog();

  const blogs = result.data;

  useEffect(() => {
    const userJson = window.localStorage.getItem("user");
    const user = JSON.parse(userJson);

    setSignedInUser(userDispatch, user);
  }, []);

  const addBlog = async (blog) => {
    blogRef.current.toggleVisibility();

    try {
      await addBlogMutation.mutateAsync({ blogDetail: blog, user });

      sendNotification(
        { notification, dispatch: notificationDispatch },
        `${blog.title} by ${blog.author} has been successfully added to the list`,
      );
    } catch (error) {
      sendNotification(
        { notification, dispatch: notificationDispatch },
        error.message,
        true,
      );
    }
  };

  const likeBlog = async (blog) => {
    try {
      await likeBlogMutation.mutateAsync({ blogDetail: blog, user });
    } catch (error) {
      sendNotification(
        { notification, dispatch: notificationDispatch },
        error.message,
        true,
      );
    }
  };

  const deleteBlog = async (blog) => {
    try {
      const status = window.confirm(`Delete "${blog.title}"?`);
      if (status) {
        await deleteBlogMutation.mutateAsync({ blogId: blog.id, user });

        sendNotification(
          { notification, dispatch: notificationDispatch },
          `${blog.title} by ${blog.author} has been successfully deleted from the list`,
        );
      }
    } catch (error) {
      sendNotification(
        { notification, dispatch: notificationDispatch },
        error.message,
        true,
      );
    }
  };

  const handleLogoutButton = () => {
    window.localStorage.removeItem("user");

    logoutUser(userDispatch);
    setUsername("");
    setPassword("");
  };

  if (result.isLoading) {
    return <div>Loading...</div>;
  }

  if (result.isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      {notification.message && <Notification notification={notification} />}
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
            <BlogForm addBlog={addBlog} />
          </Togglable>

          <BlogList
            blogs={blogs}
            loggedUser={user}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
          />
        </>
      )}
    </div>
  );
};

export default App;
