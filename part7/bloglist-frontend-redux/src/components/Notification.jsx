import PropTypes from "prop-types";

const Notification = ({ notification }) => {
  return (
    <>
      <div className={notification.type}>{notification.message}</div>
    </>
  );
};

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
};

export default Notification;
