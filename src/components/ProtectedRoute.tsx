import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../store/store";

const ProtectedRoute = () => {
  const currentUser = useAppSelector((state) => state.user);

  return localStorage.getItem("isAuth") == "true" ? (
    <Outlet />
  ) : (
    <Navigate to='/login' />
  );
};

export default ProtectedRoute;
