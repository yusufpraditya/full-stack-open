import {
  likeBlog,
  deleteBlog,
  selectBlogById,
  addComment,
} from "@/reducers/blogReducer.js";
import { useDispatch, useSelector } from "react-redux";

import "./Blog.css";
import { useParams, useNavigate } from "react-router-dom";
import { useField } from "@/hooks/useField.js";

const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.loggedInUser);
  const blog = useSelector((state) => selectBlogById(state, id));
  const { resetValue, ...commentInput } = useField("text");

  const handleLikeButton = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 };

    dispatch(likeBlog(newBlog, user));
  };

  const handleDeleteButton = () => {
    dispatch(deleteBlog(blog, user));
    navigate("/");
  };

  const handleCommentButton = () => {
    dispatch(addComment(id, commentInput.value));
    resetValue();
  };

  if (!blog || !user) return null;

  return (
    <div className="blog-container">
      <div>
        <h3 style={{ margin: "5px 0" }}>
          {blog.title} {`(${blog.author})`}
        </h3>

        {user.username === blog.creator.username && (
          <button data-testid="blog-delete-btn" onClick={handleDeleteButton}>
            delete
          </button>
        )}
      </div>
      <div>URL: {blog.url}</div>
      <div>
        <span>Likes: {blog.likes}</span>
        <button data-testid="blog-like-btn" onClick={handleLikeButton}>
          like
        </button>
      </div>
      <div>Added by {blog.creator.name}</div>
      <h4 style={{ padding: "5px 0" }}>Comments</h4>
      <input {...commentInput} />
      <button onClick={handleCommentButton}>Comment</button>
      {blog.comments &&
        blog.comments.map((comment, index) => {
          return <div key={index}>{comment}</div>;
        })}
    </div>
  );
};

export default Blog;
