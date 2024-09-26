import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries/index.js";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken, setErrorMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation(LOGIN, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message);
    },
  });

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const result = await login({
      variables: {
        username,
        password,
      },
    });

    if (result.data.login) {
      setToken(result.data.login.value);
      localStorage.setItem("userToken", result.data.login.value);
      navigate("/");
    }

    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <span>Username</span>
        <input
          placeholder="username"
          onChange={({ target }) => setUsername(target.value)}
          value={username}
        />
      </div>
      <div>
        <span>Password</span>
        <input
          placeholder="password"
          type="password"
          onChange={({ target }) => setPassword(target.value)}
          value={password}
        />
      </div>
      <button>Login</button>
    </form>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

export default Login;
