const logger = require("./logger");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "UnauthorizedError" || error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: error.message });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authHeader = request.get("authorization");

  if (authHeader && authHeader.startsWith("Bearer ")) {
    request.token = authHeader.replace("Bearer ", "");
  } else {
    request.token = null;
  }

  next();
}

const userExtractor = (request, response, next) => {
  let decodedToken;

  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET);
  } catch(error) {
    return next(error);
  }

  if (!decodedToken.id) {
    console.log("DDD");
    const error = {
      name: "UnauthorizedError",
      message: "invalid token",
    };

    return next(error);
  }

  request.user = decodedToken;

  next();
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
};
