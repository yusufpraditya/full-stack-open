import { useState } from "react";
import "./Blog.css";

const Blog = ({ blog, loggedUser, likeBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLikeButton = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 };

    likeBlog(newBlog);
  };

  const handleDeleteButton = () => {
    deleteBlog(blog);
  };

  return (
    <div className="blog-container">
      <div>
        {blog.title} {`(${blog.author})`}{" "}
        <button data-testid="blog-toggle-btn" onClick={toggleVisibility}>
          {visible ? "hide" : "show"}
        </button>
        {loggedUser.username === blog.creator.username && (
          <button data-testid="blog-delete-btn" onClick={handleDeleteButton}>delete</button>
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
