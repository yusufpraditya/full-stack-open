const Blog = require("../models/blog");
const blogRouter = require("express").Router();
const User = require("../models/user");
const middleware = require("../utils/middleware");

blogRouter.post(
  "/",
  middleware.userExtractor,
  async (request, response, next) => {
    const blogBody = { ...request.body };

    const userRequest = request.user;

    if (!blogBody.likes) {
      blogBody.likes = 0;
    }

    if (!blogBody.title) return response.status(400).end();

    if (!blogBody.author) return response.status(400).end();

    if (!blogBody.url) return response.status(400).end();

    const user = await User.findById(userRequest.id);

    if (!user.id) return response.status(400).end();

    blogBody.creator = user.id;

    const blog = new Blog(blogBody);

    try {
      const result = await blog.save();

      user.blogs = user.blogs.concat(result.id);

      await user.save();

      response.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },
);

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("creator", {
    name: 1,
    username: 1,
  });

  response.json(blogs);
});

blogRouter.put("/:id", async (request, response, next) => {
  const body = { ...request.body };
  const id = request.params.id;

  if (!body.likes) return response.status(400).end();

  const blog = {
    likes: body.likes,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });

    if (!updatedBlog) return response.status(404).end();

    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response, next) => {
    const id = request.params.id;

    const userRequest = request.user;

    try {
      const blog = await Blog.findById(id);

      if (!blog) return response.status(404).end();

      if (blog.creator.toString() === userRequest.id.toString()) {
        await Blog.deleteOne({ _id: id });
      } else {
        const error = {
          name: "UnauthorizedError",
          message: "only creator can delete",
        };

        return next(error);
      }

      return response.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

blogRouter.post("/:id/comments", async (request, response, next) => {
  const blogBody = { ...request.body };
  const id = request.params.id;

  if (!blogBody.comment) return response.status(400).end();

  const comment = blogBody.comment;
  const blog = await Blog.findById(id);
  blog.comments.push(comment);

  try {
    await blog.save();
    response.status(201).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
