import { Navigate, Outlet } from "react-router-dom";

const AuthorizedRoute = () => {
  const token = localStorage.getItem("userToken");
  if (!token) return <Navigate to="/" />;
  return <Outlet />;
};

export default AuthorizedRoute;
