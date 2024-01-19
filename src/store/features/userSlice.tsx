import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserRole = {
  _id: string;
  role_description: string;
};

export type CurrentUser = {
  username: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  isAuth: boolean;
};

const initState: CurrentUser = {
  username: "",
  first_name: "",
  last_name: "",
  role: {
    _id: "",
    role_description: "",
  },
  isAuth: false,
};

export const UserSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
      state.username = action.payload.username;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.role._id = action.payload.role._id;
      state.role.role_description = action.payload.role.role_description;
      state.isAuth = true;
    },
  },
});

export default UserSlice.reducer;
export const { setCurrentUser } = UserSlice.actions;
