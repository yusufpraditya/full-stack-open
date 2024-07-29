const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const testHelper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const api = supertest(app);

let testToken;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  // add a test user

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(testHelper.initialUser.password, saltRounds);

  const user = new User({
    name: testHelper.initialUser.name,
    username: testHelper.initialUser.username,
    passwordHash,
  });

  await user.save();

  const testUser = await User.findOne({
    username: testHelper.initialUser.username,
  });

  const userPayload = {
    username: testUser.username,
    id: testUser.id,
  };

  testToken = jwt.sign(userPayload, process.env.SECRET);

  // add blog list

  for (let blog of testHelper.initialBlogs) {
    blog.creator = testUser.id;
    const blogObj = new Blog(blog);
    const result = await blogObj.save();

    testUser.blogs = testUser.blogs.concat(result.id);

    await testUser.save();
  }
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, testHelper.initialBlogs.length);
});

test("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");

  const properties = Object.keys(response.body[0]);

  assert(properties.includes("id"));
});

test("POST /api/blogs creates a new blog post", async () => {
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${testToken}`)
    .send(newBlog)
    .expect(201);

  const blogs = await testHelper.getBlogs();
  const dbLastBlog = [...blogs].reverse()[0];

  const response = await api.get("/api/blogs");
  const responseLastBlog = [...response.body].reverse()[0];

  assert.strictEqual(response.body.length, testHelper.initialBlogs.length + 1);

  assert.deepStrictEqual(responseLastBlog, dbLastBlog);
});

describe("POST /api/blogs with", () => {
  test("no likes property", async () => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    };

    await api.post("/api/blogs").set("Authorization", `Bearer ${testToken}`).send(newBlog);

    const response = await api.get("/api/blogs");
    const responseLastBlog = [...response.body].reverse()[0];

    assert.strictEqual(responseLastBlog.likes, 0);
  });

  test("no title property", async () => {
    const newBlog = {
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    };

    await api.post("/api/blogs").set("Authorization", `Bearer ${testToken}`).send(newBlog).expect(400);
  });

  test("no url property", async () => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };

    await api.post("/api/blogs").set("Authorization", `Bearer ${testToken}`).send(newBlog).expect(400);
  });

  test("no token", async () => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };

    await api.post("/api/blogs").send(newBlog).expect(401);
  })
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    let blogs = await testHelper.getBlogs();
    const firstBlog = blogs[0];

    await api.delete(`/api/blogs/${firstBlog.id}`).set("Authorization", `Bearer ${testToken}`).expect(204);

    blogs = await testHelper.getBlogs();

    assert.strictEqual(blogs.length, testHelper.initialBlogs.length - 1);
  });

  test("fails with status code 404 if id is invalid", async () => {
    const nonExistingId = "5a422b3a1b54a676234d17f9";

    await api.delete(`/api/blogs/${nonExistingId}`).set("Authorization", `Bearer ${testToken}`).expect(404);
  });
});

describe("update likes property of a blog", () => {
  test("succeeds with status code 200 if body is valid", async () => {
    let blogs = await testHelper.getBlogs();
    const oldBlog = blogs[0];

    const body = {
      likes: oldBlog.likes + 10,
    };

    await api.put(`/api/blogs/${oldBlog.id}`).send(body).expect(200);

    blogs = await testHelper.getBlogs();
    const updatedBlog = blogs[0];

    assert.strictEqual(updatedBlog.likes, oldBlog.likes + 10);
  });

  test("fails with status code 404 if id is invalid", async () => {
    const nonExistingId = "5a422b3a1b54a676234d17f9";

    const body = {
      likes: 123,
    };

    await api.put(`/api/blogs/${nonExistingId}`).send(body).expect(404);
  });

  test("fails with status code 400 if body is invalid", async () => {
    let blogs = await testHelper.getBlogs();
    const firstBlog = blogs[0];

    const body = {
      like: firstBlog.likes + 10,
    };

    await api.put(`/api/blogs/${firstBlog.id}`).send(body).expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
