import { describe, test, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Togglable from "../../components/Togglable.jsx";

describe("<Togglable />", () => {
  let container;

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show">
        <div data-testid="children">children content</div>
      </Togglable>,
    ).container;
  });

  test("does not render its children", () => {
    const children = screen.queryByTestId("children");
    expect(children).toBeNull();
  });

  test("after clicking the button, children are displayed", async () => {
    const user = userEvent.setup();
    const showBtn = screen.getByTestId("togglable-show-btn");
    await user.click(showBtn);

    const element = screen.getByTestId("children");
    expect(element).toBeDefined();
  });
});
