import { forwardRef, useImperativeHandle, useState } from "react";

import PropTypes from "prop-types";

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
    <div>
      {!visible && (
        <button data-testid="togglable-show-btn" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      )}
      {visible && (
        <>
          {props.children}
          <button data-testid="togglable-cancel-btn" onClick={toggleVisibility}>
            Cancel
          </button>
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
