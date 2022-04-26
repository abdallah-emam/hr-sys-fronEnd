import { useLocation, Navigate, Outlet } from "react-router-dom";
import UseAuth from "../hooks/useAuth";

const RequireAuth = ({ value }) => {
  const { auth } = UseAuth();
  const location = useLocation();
  if (value === "true") {
    return auth?.name ? (
      <Outlet />
    ) : (
      <Navigate to="/Signin" state={{ from: location }} replace />
    );
  } else {
    return !auth?.name ? (
      <Outlet />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    );
  }
};

export default RequireAuth;
