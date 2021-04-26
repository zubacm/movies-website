import React from "react";
import Login from "./Login/Login";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { Redirect, Route } from "react-router";

export default function PrivateRoute({ component: Component, roles, ...rest }) {
  const user = useSelector(selectUser);

  function arraysHaveCommonElements(arr1, arr2) {
    return arr1.some((item) => arr2.includes(item));
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) {
          return <Login {...props} />;
        }

        if (roles) {
          if (!user.Role) {
            return <Redirect to={{ pathname: "/login" }} />; //promijenit na not authorised
          } else if (!Array.isArray(user.Role)) {
            //ako user.Roles nije niz vec samo jedna vrijednost
            if (!roles.includes(user.Roles)) {
              return <Redirect to={{ pathname: "/login" }} />; //promijenit na not authorised
            }
          } else if (!arraysHaveCommonElements(roles, user.Role)) {
            //ako je niz
            return <Redirect to={{ pathname: "/login" }} />; //promijenit na not authorised
          }
        }
        return <Component {...props} />;
      }}
    ></Route>
  );
}
