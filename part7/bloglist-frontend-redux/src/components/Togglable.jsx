import { forwardRef, useImperativeHandle, useState } from "react";

import PropTypes from "prop-types";
import Button from "@/components/Button.jsx";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div className="w-full">
      {!visible && (
        <Button
          className="w-full"
          data-testid="togglable-show-btn"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      )}
      {visible && (
        <>
          {props.children}
          <Button
            className="w-full bg-red-600 text-white mt-2"
            data-testid="togglable-cancel-btn"
            onClick={toggleVisibility}
          >
            Cancel
          </Button>
        </>
      )}
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
