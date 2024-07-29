import { useSelector } from "react-redux";

const Notification = () => {
  const content = useSelector((state) => state.notification.content);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  if (!content) return null;

  return <div style={style}>{content}</div>;
};

export default Notification;
