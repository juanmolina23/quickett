import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import APICall from "./classes/APICall";
import { useAppDispatch, useAppSelector } from "./store/store";
import { setCurrentUser } from "./store/features/userSlice";
import { useEffect } from "react";

type UserRole = {
  _id: string;
  role_description: string;
};

type CurrentUser = {
  username: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  isAuth: boolean;
};

type APIResponse = {
  status: number;
  message: string;
  data?: CurrentUser;
};

function App() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user);

  async function isUserLoggedIn() {
    try {
      const res: APIResponse = await APICall.get(
        "http://localhost:3000/api/user/"
      );
      if (res.message != "User Is Not Authenticated") {
        dispatch(setCurrentUser(res.data!));
        localStorage.setItem("isAuth", "true");
      } else {
        localStorage.setItem("isAuth", "false");
      }
    } catch (err) {
      console.log(err);
    }
  }

  isUserLoggedIn();

  return (
    <Router>
      <Routes>
        <Route
          path='/login'
          element={
            localStorage.getItem("isAuth") == "true" ? (
              <Navigate to='/' />
            ) : (
              <Login />
            )
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
