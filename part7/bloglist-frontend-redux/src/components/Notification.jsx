import PropTypes from "prop-types";
import { cn } from "@/utils/cn.js";

const Notification = ({ notification, className }) => {
  if (notification.type === "success")
    return (
      <div
        className={cn(
          "text-white p-3 rounded-xl mt-2.5 bg-lime-600 absolute right-4 bottom-0 animate-toast opacity-0",
          className,
        )}
      >
        {notification.message}
      </div>
    );

  return (
    <div
      className={cn(
        "text-white p-3 rounded-xl mt-2.5 bg-red-600 absolute right-4 bottom-0 animate-toast opacity-0",
        className,
      )}
    >
      {notification.message}
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
};

export default Notification;
