import { useState, useEffect, useRef } from "react";

import blogService from "./services/blogs";

import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const blogRef = useRef(null);

  const addBlog = async (blog) => {
    blogRef.current.toggleVisibility();

    try {
      const response = await blogService.add(blog, user.token);

      const creatorId = response.data.creator;

      response.data.creator = {
        id: creatorId,
        name: user.name,
        username: user.username,
      };

      const newBlogs = blogs.concat(response.data);
      setBlogs(newBlogs);

      setNotification({
        type: "success",
        message: `${blog.title} by ${blog.author} has been successfully added to the list`,
      });

      setTimeout(() => setNotification(null), 2500);
    } catch (error) {
      setNotification({
        type: "error",
        message: error.message,
      });

      setTimeout(() => setNotification(null), 2500);
    }
  };

  const likeBlog = async (blog) => {
    try {
      const response = await blogService.update(blog, user.token);
      const blogLikes = response.data.likes;
      const newBlogs = [...blogs].map((b) => {
        if (b.id === blog.id) return { ...b, likes: blogLikes };
        else return b;
      });

      setBlogs(newBlogs);
    } catch (error) {
      setNotification({
        type: "error",
        message: error.message,
      });

      setTimeout(() => setNotification(null), 2500);
    }
  };

  const deleteBlog = async (blog) => {
    try {
      const status = window.confirm(`Delete "${blog.title}"?`);

      if (status) {
        await blogService.remove(blog.id, user.token);

        setBlogs(blogs.filter((b) => b.id !== blog.id));

        setNotification({
          type: "success",
          message: `${blog.title} by ${blog.author} has been successfully deleted from the list`,
        });
  
        setTimeout(() => setNotification(null), 2500);
      }
    } catch (error) {
      setNotification({
        type: "error",
        message: error.message,
      });

      setTimeout(() => setNotification(null), 2500);
    }
  };

  const handleLogoutButton = () => {
    window.localStorage.removeItem("user");

    setUser(null);
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const userJson = window.localStorage.getItem("user");
    const user = JSON.parse(userJson);

    setUser(user);
  }, []);

  return (
    <div>
      {notification && <Notification notification={notification} />}
      {user === null && (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          setUser={setUser}
          setNotification={setNotification}
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
