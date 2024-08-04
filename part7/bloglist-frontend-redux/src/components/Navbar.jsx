import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/reducers/userReducer.js";
import { useNavigate, NavLink } from "react-router-dom";
import styled from "styled-components";
import Button from "@/components/Button.jsx";

const Nav = styled.nav`
  padding: 10px;
  margin-bottom: 10px;
  background-color: #e3e3e3;
`;

const StyledNavLink = styled(NavLink)`
  margin: 0 5px;

  &.active {
    background-color: white;
  }
`;

const Navbar = ({ setLoginInfo }) => {
  const user = useSelector((state) => state.user.loggedInUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutButton = () => {
    window.localStorage.removeItem("loggedInUser");
    window.localStorage.removeItem("users");

    dispatch(logoutUser());

    setLoginInfo({
      username: "",
      password: "",
    });

    navigate("/");
  };

  return (
    <Nav>
      <StyledNavLink to="/">Home</StyledNavLink>
      <StyledNavLink to="/blogs">Blogs</StyledNavLink>
      <StyledNavLink to="/users">Users</StyledNavLink>
      <span>
        {user.name} logged in{" "}
        <Button onClick={handleLogoutButton}>Logout</Button>
      </span>
    </Nav>
  );
};

export default Navbar;
