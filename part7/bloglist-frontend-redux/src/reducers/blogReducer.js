import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogList",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      return state.concat(action.payload);
    },
  },
});

export const selectBlogById = (state, id) => {
  if (!state.blogList) return null;
  return state.blogList.find((blog) => blog.id === id);
};

const { setBlogs, appendBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addBlog = (blog, user) => {
  return async (dispatch) => {
    try {
      const response = await blogService.add(blog, user.token);

      const creatorId = response.data.creator;

      response.data.creator = {
        id: creatorId,
        name: user.name,
        username: user.username,
      };

      dispatch(appendBlog(response.data));

      dispatch(
        setNotification(
          "success",
          `${response.data.title} by ${response.data.author} has been successfully added to the list`,
        ),
      );
    } catch (error) {
      dispatch(setNotification("error", error.message));
    }
  };
};

export const likeBlog = (blog, user) => {
  return async (dispatch, getState) => {
    try {
      const blogs = getState().blogList;

      const response = await blogService.update(blog, user.token);
      const blogLikes = response.data.likes;

      const newBlogs = [...blogs].map((b) => {
        if (b.id === blog.id) return { ...b, likes: blogLikes };
        else return b;
      });

      dispatch(setBlogs(newBlogs));
    } catch (error) {
      dispatch(setNotification("error", error.message));
    }
  };
};

export const deleteBlog = (blog, user) => {
  return async (dispatch, getState) => {
    try {
      const blogs = getState().blogList;
      const status = window.confirm(`Delete "${blog.title}"?`);

      if (status) {
        await blogService.remove(blog.id, user.token);

        dispatch(setBlogs(blogs.filter((b) => b.id !== blog.id)));

        dispatch(
          setNotification(
            "success",
            `${blog.title} by ${blog.author} has been successfully deleted from the list`,
          ),
        );
      }
    } catch (error) {
      dispatch(setNotification("error", error.message));
    }
  };
};

export const addComment = (blogId, comment) => {
  return async (dispatch) => {
    try {
      await blogService.addComment(blogId, comment);

      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    } catch (error) {
      dispatch(setNotification("error", error.message));
    }
  };
};

export default blogSlice.reducer;
