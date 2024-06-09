const Notification = ({message}) => {
  if (message === null) return null;

  const notificationType = message.type;
  const notificationMessage = message.message;

  return (
   <div className={notificationType}>
    {notificationMessage}
   </div> 
  );
};

export default Notification;
