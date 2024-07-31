import authService from "../services/auth.js";
import { sendNotification } from "../reducers/notificationReducer.js";
import {
  useNotificationValue,
  useDispatchNotification,
} from "../hooks/notification/index.js";
import { useDispatchUser, useUserValue } from "../hooks/users/index.js";
import { setSignedInUser } from "../reducers/userReducer.js";

const LoginForm = ({ username, password, setUsername, setPassword }) => {
  const notification = useNotificationValue();
  const notificationDispatch = useDispatchNotification();
  const userDispatch = useDispatchUser();

  const handleLoginButton = async (event) => {
    event.preventDefault();

    try {
      const user = await authService.login(username, password);
      setSignedInUser(userDispatch, user);

      window.localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      sendNotification(
        { notification, dispatch: notificationDispatch },
        error.message,
        true,
      );
    }
  };

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value);
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLoginButton}>
        <div>
          <label htmlFor="username">Username </label>
          <input
            type="text"
            id="username"
            placeholder="username"
            autoComplete="off"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <input type="submit" value="Login" />
      </form>
    </>
  );
};

export default LoginForm;
