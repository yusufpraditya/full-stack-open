import PropTypes from "prop-types";

const Notification = ({ message, setErrorMessage }) => {
  if (!message) return null;

  return (
    <div style={{ color: "red" }}>
      <span>{message}</span>
      <button onClick={() => setErrorMessage(null)}>hide</button>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  setErrorMessage: PropTypes.func.isRequired,
};

export default Notification;
