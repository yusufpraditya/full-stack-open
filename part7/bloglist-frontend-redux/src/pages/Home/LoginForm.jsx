import authService from "../../services/auth.js";
import { setNotification } from "@/reducers/notificationReducer.js";
import { useDispatch } from "react-redux";
import { setSignedInUser } from "@/reducers/userReducer.js";
import Button from "@/components/Button.jsx";

const LoginForm = ({ loginInfo, setLoginInfo }) => {
  const dispatch = useDispatch();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await authService.login(
        loginInfo.username,
        loginInfo.password,
      );
      dispatch(setSignedInUser(user));
    } catch (error) {
      dispatch(setNotification("error", error.message));
    }
  };

  const handleUsernameChange = ({ target }) => {
    setLoginInfo({ ...loginInfo, username: target.value });
  };

  const handlePasswordChange = ({ target }) => {
    setLoginInfo({ ...loginInfo, password: target.value });
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="username">Username </label>
          <input
            type="text"
            id="username"
            placeholder="username"
            autoComplete="off"
            value={loginInfo.username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            placeholder="password"
            value={loginInfo.password}
            onChange={handlePasswordChange}
          />
        </div>
        <Button>Login</Button>
      </form>
    </>
  );
};

export default LoginForm;
