const login = async (page, username, password) => {
  await page.getByLabel("Username").fill(username);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
};

const createBlog = async (page, blogIndex) => {
  await page.getByRole("button", { name: "New blog" }).click();
  await page.getByLabel("title").fill(`Blog Title ${blogIndex}`);
  await page.getByLabel("author").fill(`Blog Author ${blogIndex}`);
  await page.getByLabel("url").fill(`Blog URL ${blogIndex}`);
  await page.getByRole("button", { name: "Add" }).click();
  await page
    .getByText(`Blog Title ${blogIndex} (Blog Author ${blogIndex})`)
    .waitFor();
};

const likeBlog = async (page, likeCount, blogIndex) => {
  for (let i = 0; i < likeCount; i++) {
    const blog = page.getByText(`Blog URL ${blogIndex}`).locator("..");
    await blog.getByTestId("blog-like-btn").click();
    await blog.getByText(`Likes: ${i + 1}`).waitFor();
  }
};

export { login, createBlog, likeBlog };
