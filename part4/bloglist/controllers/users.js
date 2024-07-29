const bcrypt = require("bcrypt");

const User = require("../models/user");
const userRouter = require("express").Router();

userRouter.post("/", async (request, response, next) => {
  const { name, username, password } = request.body;

  if (password.length <= 3) {
    const error = {
      name: "ValidationError",
      message: "password must be at least 3 characters long",
    };
    next(error);
    return;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    name,
    username,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/", async (request, response) => {
  let users = await User.find({}).populate("blogs", {creator: 0});

  users = users.map((user) => {
    return {
      name: user.name,
      username: user.username,
      id: user.id,
      blogs: user.blogs,
    };
  });

  response.json(users);
});

module.exports = userRouter;
