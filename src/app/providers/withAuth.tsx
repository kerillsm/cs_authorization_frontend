import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../../shared/contexts/AuthContext";

export const WithAuthProvider = () => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
};
