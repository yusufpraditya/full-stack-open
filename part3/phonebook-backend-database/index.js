require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

morgan.token("body", (req) =>
  JSON.stringify(req.body) === "{}" ? "" : JSON.stringify(req.body)
);

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// POST
app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (!body.name)
    return response.status(400).json({ error: "name is missing" });

  if (!body.number)
    return response.status(400).json({ error: "number is missing" });

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((result) => {
      console.log(
        `added ${result.name} with number ${result.number} to phonebook`
      );
      response.json(person);
    })
    .catch((error) => next(error));
});

// GET all
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// GET /:id
app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// GET /info
app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    response.send(
      `<p>Phonebook has info for ${
        persons.length
      } people</p> <p>${new Date().toLocaleString()}</p>`
    );
  });
});

// PUT /:id
app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  const id = request.params.id;

  if (!body.name)
    return response.status(400).json({ error: "name is missing" });

  if (!body.number)
    return response.status(400).json({ error: "number is missing" });

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      if (updatedPerson) {
        response.json(updatedPerson);
      } else {
        response.status(404).send();
      }
    })
    .catch((error) => next(error));
});

// DELETE /:id
app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  Person.findByIdAndDelete(id)
    .then((person) => {
      if (person) {
        response.status(204).end();
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
