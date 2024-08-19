import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Routes, Route, useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <button onClick={() => navigate("/authors")}>authors</button>
        <button onClick={() => navigate("/books")}>books</button>
        <button onClick={() => navigate("/newbook")}>add book</button>
      </div>

      <Routes>
        <Route element={<Authors />} path="/" />
        <Route element={<Authors />} path="/authors" />
        <Route element={<Books />} path="/books" />
        <Route element={<NewBook />} path="/newbook" />
      </Routes>
    </div>
  );
};

export default App;
