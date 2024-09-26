import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login.jsx";
import { useApolloClient } from "@apollo/client";
import Notification from "./components/Notification.jsx";
import AuthorizedRoute from "./components/AuthorizedRoute.jsx";
import { Recommend } from "./components/Recommend.jsx";

const App = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const client = useApolloClient();

  const handleLogout = async () => {
    setToken(null);
    localStorage.clear();
    await client.resetStore();
    navigate("/");
  };

  return (
    <div>
      <div>
        <button onClick={() => navigate("/authors")}>authors</button>
        <button onClick={() => navigate("/books")}>books</button>
        <button
          onClick={() => (token ? navigate("/newbook") : navigate("/login"))}
        >
          {token ? "add book" : "login"}
        </button>
        {token && (
          <button
            onClick={() =>
              token ? navigate("/recommend") : navigate("/login")
            }
          >
            recommend
          </button>
        )}

        {token ? <button onClick={handleLogout}>Logout</button> : null}
      </div>

      <Notification message={errorMessage} setErrorMessage={setErrorMessage} />

      <Routes>
        <Route element={<Authors />} path="/" />
        <Route element={<Authors />} path="/authors" />
        <Route element={<Books />} path="/books" />

        <Route
          element={
            <Login setToken={setToken} setErrorMessage={setErrorMessage} />
          }
          path="/login"
        />
        <Route element={<AuthorizedRoute />}>
          <Route element={<NewBook />} path="/newbook" />
          <Route element={<Recommend />} path="/recommend" />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
