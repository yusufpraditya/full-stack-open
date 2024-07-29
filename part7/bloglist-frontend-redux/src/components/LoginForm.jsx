import authService from "../services/auth.js";

const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  setUser,
  setNotification,
}) => {
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await authService.login(username, password);
      setUser(user);

      window.localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      setNotification({
        type: "error",
        message: error.message,
      });

      setTimeout(() => setNotification(null), 2500);
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
      <form onSubmit={handleFormSubmit}>
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
