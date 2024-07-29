const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const testHelper = require("./test_helper");
const User = require("../models/user");

const supertestApi = supertest(app);

describe("add an invalid user", () => {
  test("fails and is not created/saved", async () => {
    const user = {
      name: "Cvpfus",
      username: "cvpfus",
      password: "cv",
    };

    await supertestApi.post("/api/users").send(user);

    let users = await testHelper.getUsers();
    users = users.map((user) => user.username);

    assert(!users.includes(user.username));
  });

  test("fails and returns 400 with error message", async () => {
    const user = {
      name: "Cvpfus",
      username: "cvpfus",
      password: "cv",
    };

    const result = await supertestApi.post("/api/users").send(user).expect(400);
    
    assert(result.hasOwnProperty("error"));
  })
});

after(async () => {
  await mongoose.connection.close();
});
