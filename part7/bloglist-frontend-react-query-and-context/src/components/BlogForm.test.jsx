import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("blog form calls the callback with the right details", async () => {
  const addBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm addBlog={addBlog} />);

  const titleInput = screen.getByTestId("blog-title");
  const authorInput = screen.getByTestId("blog-author");
  const urlInput = screen.getByTestId("blog-url");
  const submitButton = screen.getByTestId("blog-form-submit");

  await user.type(titleInput, "Blog Title");
  await user.type(authorInput, "Blog Author");
  await user.type(urlInput, "Blog URL");
  await user.click(submitButton);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe("Blog Title");
  expect(addBlog.mock.calls[0][0].author).toBe("Blog Author");
  expect(addBlog.mock.calls[0][0].url).toBe("Blog URL");
});
