import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../store/store";

const ProtectedRoute = () => {
  const currentUser = useAppSelector((state) => state.user);

  return currentUser.isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
