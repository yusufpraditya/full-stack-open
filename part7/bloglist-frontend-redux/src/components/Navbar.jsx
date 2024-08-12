import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/reducers/userReducer.js";
import { useNavigate, NavLink } from "react-router-dom";
import Button from "@/components/Button.jsx";

const Navbar = ({ setLoginInfo }) => {
  const user = useSelector((state) => state.user.loggedInUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutButton = () => {
    window.localStorage.removeItem("loggedInUser");

    dispatch(logoutUser());

    setLoginInfo({
      username: "",
      password: "",
    });

    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-4 py-1 mb-3 flex justify-between items-center">
      <div className="flex gap-8">
        <NavLink
          className="[&.active]:bg-black [&.active]:text-white rounded-md px-4 py-2"
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className="[&.active]:bg-black [&.active]:text-white rounded-md px-4 py-2"
          to="/blogs"
        >
          Blogs
        </NavLink>
        <NavLink
          className="[&.active]:bg-black [&.active]:text-white rounded-md px-4 py-2"
          to="/users"
        >
          Users
        </NavLink>
      </div>
      <div>
        <span>
          {user.name} logged in{" "}
          <Button onClick={handleLogoutButton}>Logout</Button>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
