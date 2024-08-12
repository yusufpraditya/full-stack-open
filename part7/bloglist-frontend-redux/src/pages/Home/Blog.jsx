import {
  likeBlog,
  deleteBlog,
  selectBlogById,
  addComment,
} from "@/reducers/blogReducer.js";
import { useDispatch, useSelector } from "react-redux";

import { useParams, useNavigate } from "react-router-dom";
import { useField } from "@/hooks/useField.js";
import Button from "@/components/Button.jsx";
import { setNotification } from "@/reducers/notificationReducer.js";

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
    if (commentInput.value === "") {
      dispatch(setNotification("error", "Comment must not be empty."));
    } else {
      dispatch(addComment(id, commentInput.value));
      resetValue();
    }
  };

  if (!blog || !user) return null;

  return (
    <div className="flex flex-col items-center">
      <div className="mx-2.5 rounded-2xl p-2.5 border-2 shadow-md">
        <div className="m-4">
          <div>
            <h2 className="font-medium text-center mb-2">
              {blog.title} {`(${blog.author})`}
            </h2>

            {user.username === blog.creator.username && (
              <Button
                className="w-full bg-red-600 text-white"
                data-testid="blog-delete-btn"
                onClick={handleDeleteButton}
              >
                delete
              </Button>
            )}
          </div>
          <div>URL: {blog.url}</div>
          <div>
            <span>Likes: {blog.likes}</span>
            <Button
              className="ml-4"
              data-testid="blog-like-btn"
              onClick={handleLikeButton}
            >
              like
            </Button>
          </div>
          <div>Added by {blog.creator.name}</div>
          <h4 className="py-1 mt-4 font-bold">Comments</h4>
          <input className="outline-0 border-2 p-1 mr-2" {...commentInput} />
          <Button className="mb-4" onClick={handleCommentButton}>
            Comment
          </Button>
          {blog.comments &&
            blog.comments.map((comment, index) => {
              return <div key={index}>{comment}</div>;
            })}
        </div>
      </div>
    </div>
  );
};

export default Blog;
