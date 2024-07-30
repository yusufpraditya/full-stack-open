import { useState } from "react";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";

import "./Blog.css";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLikeButton = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 };

    dispatch(likeBlog(newBlog, user));
  };

  const handleDeleteButton = () => {
    dispatch(deleteBlog(blog, user));
  };

  return (
    <div className="blog-container">
      <div>
        {blog.title} {`(${blog.author})`}{" "}
        <button data-testid="blog-toggle-btn" onClick={toggleVisibility}>
          {visible ? "hide" : "show"}
        </button>
        {user.username === blog.creator.username && (
          <button data-testid="blog-delete-btn" onClick={handleDeleteButton}>
            delete
          </button>
        )}
      </div>
      {visible && (
        <>
          <div>URL: {blog.url}</div>
          <div>
            <span>Likes: {blog.likes}</span>
            <button data-testid="blog-like-btn" onClick={handleLikeButton}>
              like
            </button>
          </div>
          <div>Added by {blog.creator.name}</div>
        </>
      )}
    </div>
  );
};

export default Blog;
