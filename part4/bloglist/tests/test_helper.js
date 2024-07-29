const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];

const initialUser = {
  name: "TestUser",
  username: "testuser",
  password: "testuser",
};

const getNonExistingId = async () => {
  const blog = new Blog({
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  });

  await blog.save();
  await blog.deleteOne();

  return blog.id.toString();
};

const getBlogs = async () => {
  const blogs = await Blog.find({}).populate("creator", {
    name: 1,
    username: 1,
  });
  return blogs.map((blog) => blog.toJSON());
};

const getUsers = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  initialUser,
  getNonExistingId,
  getBlogs,
  getUsers,
};
