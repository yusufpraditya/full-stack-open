import { useState } from "react";
import { addBlog } from "@/reducers/blogReducer.js";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/Button.jsx";

const BlogForm = ({ blogRef }) => {
  const [newBlog, setNewBlog] = useState({});
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.loggedInUser);

  const handleAddBlog = (event) => {
    event.preventDefault();

    blogRef.current.toggleVisibility();

    dispatch(addBlog(newBlog, user));

    setNewBlog({});
  };

  const handleTitleChange = ({ target }) => {
    const newBlogDetail = { ...newBlog, title: target.value };

    setNewBlog(newBlogDetail);
  };

  const handleAuthorChange = ({ target }) => {
    const newBlogDetail = { ...newBlog, author: target.value };

    setNewBlog(newBlogDetail);
  };

  const handleUrlChange = ({ target }) => {
    const newBlogDetail = { ...newBlog, url: target.value };

    setNewBlog(newBlogDetail);
  };

  return (
    <>
      <form onSubmit={handleAddBlog}>
        <div>
          <label htmlFor="title">title: </label>
          <input
            data-testid="blog-title"
            type="text"
            id="title"
            placeholder="title"
            onChange={handleTitleChange}
            autoComplete="off"
            required
          />
        </div>

        <div>
          <label htmlFor="author">author: </label>
          <input
            data-testid="blog-author"
            type="text"
            id="author"
            placeholder="author"
            onChange={handleAuthorChange}
            autoComplete="off"
            required
          />
        </div>

        <div>
          <label htmlFor="url">url: </label>
          <input
            data-testid="blog-url"
            type="text"
            id="url"
            placeholder="url"
            onChange={handleUrlChange}
            autoComplete="off"
            required
          />
        </div>

        <Button data-testid="blog-form-submit">Add</Button>
      </form>
    </>
  );
};

export default BlogForm;
