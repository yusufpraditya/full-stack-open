const { test, expect, beforeEach, describe } = require("@playwright/test");
const { login, createBlog, likeBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");

    await request.post("/api/users", {
      data: {
        name: "TestUser1",
        username: "testuser1",
        password: "testuser1",
      },
    });

    await request.post("/api/users", {
      data: {
        name: "TestUser2",
        username: "testuser2",
        password: "testuser2",
      },
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await expect(page.getByLabel("Username")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByLabel("Username").fill("testuser1");
      await page.getByLabel("Password").fill("testuser1");
      await page.getByRole("button", { name: "Login" }).click();

      await expect(page.getByText("TestUser1 logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByLabel("Username").fill("elonmusk");
      await page.getByLabel("Password").fill("elonmusk");
      await page.getByRole("button", { name: "Login" }).click();

      await expect(
        page.getByText("invalid username or password")
      ).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await login(page, "testuser1", "testuser1");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, 1);

      await expect(
        page.getByText(
          "Blog Title 1 by Blog Author 1 has been successfully added to the list"
        )
      ).toBeVisible();

      await expect(
        page.getByText("Blog Title 1 (Blog Author 1)")
      ).toBeVisible();
    });

    test("a blog can be liked", async ({ page }) => {
      await createBlog(page, 1);

      await page.getByTestId("blog-toggle-btn").click();

      await expect(page.getByText("Likes:")).toHaveText("Likes: 0");

      await page.getByTestId("blog-like-btn").click();

      await expect(page.getByText("Likes:")).toHaveText("Likes: 1");
    });

    test("a blog can be deleted", async ({ page }) => {
      await createBlog(page, 1);

      page.on("dialog", (dialog) => dialog.accept());

      await page.getByTestId("blog-delete-btn").click();

      await expect(
        page.getByText(
          "Blog Title 1 by Blog Author 1 has been successfully deleted from the list"
        )
      ).toBeVisible();
    });

    test("only the user can see the blog's delete button", async ({ page }) => {
      await createBlog(page, 1);

      await expect(page.getByTestId("blog-delete-btn")).toBeVisible();

      await page.getByRole("button", { name: "Logout" }).click();

      await login(page, "testuser2", "testuser2");

      await expect(page.getByText("TestUser2 logged in")).toBeVisible();
      await expect(page.getByTestId("blog-delete-btn")).not.toBeVisible();
    });

    test.only("blogs are arranged in the order according to the likes (descending)", async ({
      page,
    }) => {
      await createBlog(page, 1);
      await createBlog(page, 2);
      await createBlog(page, 3);

      for (let i = 0; i < 3; i++) {
        await page.getByTestId("blog-toggle-btn").nth(i).click();
      }

      // add 2 likes to Blog 3
      await likeBlog(page, 2, 3);

      // add 6 likes to Blog 2
      await likeBlog(page, 6, 2);

      // add 4 likes to Blog 1
      await likeBlog(page, 4, 1);

      const blogLocator = await page.locator(".blog-container").all();

      await expect(blogLocator[0]).toContainText("Blog Title 2 (Blog Author 2)");
      await expect(blogLocator[0]).toContainText("Likes: 6");
      await expect(blogLocator[1]).toContainText("Blog Title 1 (Blog Author 1)");
      await expect(blogLocator[1]).toContainText("Likes: 4");
      await expect(blogLocator[2]).toContainText("Blog Title 3 (Blog Author 3)");
      await expect(blogLocator[2]).toContainText("Likes: 2");
    });
  });
});
