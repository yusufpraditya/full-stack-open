import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../Home/Blog.jsx";

const blog = {
  title: "Canonical string reduction",
  creator: {
    username: "elonmusk",
  },
  author: "Smart Guy",
  likes: 123,
  url: "http://someurl.com",
};

const loggedUser = {
  username: "cvpfus",
};

test("renders blog title & author", () => {
  render(<Blog blog={blog} loggedUser={loggedUser} />);

  const element = screen.getByText(`${blog.title} (${blog.author})`);

  expect(element).toBeDefined();
});

test("does not render blog likes & url", () => {
  render(<Blog blog={blog} loggedUser={loggedUser} />);

  let element = screen.queryByText(blog.likes, { exact: false });
  expect(element).toBeNull();

  element = screen.queryByText(blog.url, { exact: false });
  expect(element).toBeNull();
});

test("after clicking the button, blog likes & url are displayed", async () => {
  render(<Blog blog={blog} loggedUser={loggedUser} />);

  const user = userEvent.setup();
  const toggleBtn = screen.getByTestId("blog-toggle-btn");
  await user.click(toggleBtn);

  let element = screen.queryByText(blog.likes, { exact: false });
  expect(element).toBeDefined();

  element = screen.queryByText(blog.url, { exact: false });
  expect(element).toBeDefined();
});

test("clicking like button twice causes event handler called twice", async () => {
  const likeBlog = vi.fn();

  render(<Blog blog={blog} loggedUser={loggedUser} likeBlog={likeBlog} />);

  const user = userEvent.setup();

  const toggleBtn = screen.getByTestId("blog-toggle-btn");
  await user.click(toggleBtn);

  const likeBtn = screen.getByTestId("blog-like-btn");
  await user.click(likeBtn);
  await user.click(likeBtn);

  expect(likeBlog.mock.calls).toHaveLength(2);
});
