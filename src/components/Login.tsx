import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setCurrentUser } from "../store/features/userSlice";

type LoginData = {
  username: string;
  password: string;
};

const Login = () => {
  const [userLoginData, setUserLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user);
  const onLogin = async (e: FormEvent) => {
    e.preventDefault();
    const data = await fetch("http://localhost:3000/api/login", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(userLoginData),
    }).then((res) => res.json());
    dispatch(setCurrentUser(data));
    console.log(data);
  };
  return (
    <div className='container pt-60px'>
      <h2>Login Form</h2>
      <form action=''>
        <label>Username</label>
        <input
          type='text'
          onChange={(e) =>
            setUserLoginData((prev) => {
              return { ...prev, username: e.target.value };
            })
          }
        />
        <label>Password</label>
        <input
          type='password'
          onChange={(e) =>
            setUserLoginData((prev) => {
              return { ...prev, password: e.target.value };
            })
          }
        />
        <p>{currentUser.first_name}</p>
        <button type='submit' onClick={(e) => onLogin(e)}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
