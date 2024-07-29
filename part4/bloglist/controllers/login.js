const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response, next) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });

  const isPasswordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(isPasswordCorrect && user)) {
    const error = {
      name: "UnauthorizedError",
      message: "invalid username or password",
    };

    next(error);
    return;
  }

  const userPayload = {
    username: user.username, 
    id: user.id
  };

  const token = jwt.sign(userPayload, process.env.SECRET);
  
  response.status(200).send({token, name: user.name, username: user.username});
});

module.exports = loginRouter;
