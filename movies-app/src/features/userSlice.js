import { createSlice } from "@reduxjs/toolkit";
import jwt from "jwt-decode";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user:
      localStorage.getItem("token") != null
        ? jwt(localStorage.getItem("token"))
        : "",
  },
  reducers: {
    loginReducer: (state, action) => {
      state.user = action.payload.user;
      //u useru cuva name, id , role, userPermissions i sve sto treba
    },
    logoutReducer: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { loginReducer, logoutReducer } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
