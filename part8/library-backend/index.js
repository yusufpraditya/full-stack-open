const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const mongoose = require("mongoose");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
require("dotenv").config();

mongoose.set("strictQuery", false);
const Book = require("./models/bookModel");
const Author = require("./models/authorModel");
const User = require("./models/userModel");

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    allGenres: [String!]!
    me: User
  }
  
  type Book {
    id: ID!
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }
  
  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }
  
  type User {
    id: ID!
    username: String!
    favoriteGenre: String!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name });
      return Book.find({ author: author._id }).countDocuments();
    },
  },
  Query: {
    bookCount: async () => Book.find({}).countDocuments(),
    authorCount: async () => Author.find({}).countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate("author");
      }

      if (!args.genre) {
        const author = await Author.findOne({ name: args.author });
        return Book.find({ author: author._id }).populate("author");
      }

      if (!args.author) {
        return Book.find({ genres: args.genre }).populate("author");
      }

      const author = await Author.findOne({ name: args.author });
      return Book.find({ author: author._id, genres: args.genre }).populate(
        "author",
      );
    },
    allAuthors: async () => Author.find({}),
    allGenres: async () => {
      const books = await Book.find({}, "genres");

      return [...new Set([...books].map((book) => book.genres).flat(1))];
    },
    me: (_, __, { currentUser }) => {
      console.log(currentUser);
      return currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("Unauthorized access", {
          extensions: {
            code: "FORBIDDEN",
          },
        });
      }

      const author = await Author.findOne({ name: args.author });

      let newAuthorId;

      if (!author) {
        try {
          const newAuthor = new Author({ name: args.author });
          await newAuthor.save();

          newAuthorId = newAuthor._id;
        } catch (error) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }
      } else {
        newAuthorId = author._id;
      }

      const book = new Book({ ...args, author: newAuthorId });

      try {
        return await book.save();
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("Unauthorized access", {
          extensions: {
            code: "FORBIDDEN",
          },
        });
      }

      const author = await Author.findOne({ name: args.name });

      if (!author) {
        return null;
      }

      author.born = args.setBornTo;

      return author.save();
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("Wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.replace("Bearer ", ""),
        process.env.SECRET,
      );

      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
