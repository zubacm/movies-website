//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/userSlice";

import { loginReducer } from "../features/userSlice";
import { logoutReducer } from "../features/userSlice";
import axios from "axios";
import jwt from "jwt-decode";

import { toast } from "react-toastify";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const user = useSelector(selectUser);
  //const user = useSelector((state) => state.User);
  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();

  const history = useHistory();

  async function login(username, password) {
    axios({
      method: "post",
      url: "https://localhost:44378/api/user/login",
      data: {
        username: username,
        password: password,
      },
    }).then(
      (response) => {
        localStorage.setItem("token", response.data.token);
        dispatch(
          loginReducer({
            user: jwt(response.data.token),
          })
        );
        history.push("/");
      },
      (error) => {
        toast.error(error.response.data);
      }
    );
  }

  async function register(username, password) {
    axios({
      method: "post",
      url: "https://localhost:44378/api/user/register",
      data: {
        username: username,
        password: password,
      },
    }).then(
      (response) => {
        if (response.data.statusCodeResult === "200") {
          // toast.success("success");
          history.push("/login/registered=true");
        } else {
          toast.error(response.data.message);
        }
      },
      (error) => {
        toast.error(error.response.data);
      }
    );
  }

  async function logout() {
    dispatch(logoutReducer());

    history.push("/login");
  }

  function userHasRole(role) {
    if (!user.Role) {
      return false;
    } else if (!Array.isArray(user.Role)) {
      //ako user.Roles nije niz vec samo jedna vrijednost
      if (role === user.Roles) {
        return true;
      }
    } else if (user.Role.includes(role)) {
      return true;
    }
    return false;
  }

  const value = {
    login,
    register,
    logout,
    userHasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
