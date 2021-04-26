import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import AddMovie from "./slick/movies/addmovie/AddMovie";
import axios from "axios";
import UserProfile from "./UserProfile/UserProfile";
import ManageUsers from "./ManageUsers/ManageUsers";
import Movies from "./slick/movies/movies";
import { useAuth } from "./contexts/AuthContext";

export default function Home() {
  const [navigation, setNavigation] = useState("/");
  const user = useSelector(selectUser);
  const [searchString, setSearchString] = useState("");
  const { userHasRole } = useAuth();

  const renderSwitch = (navigation) => {
    switch (navigation) {
      case "/":
        return <Movies id="" search={searchString} />;
      case "/home":
        return <Movies id="" search={searchString} />;
      case "/add-movie":
        return <AddMovie />;
      case "/user-profile":
        return <UserProfile user={user} />;
      case "/manage-users":
        if (userHasRole("rola")) {
          return <ManageUsers />;
        }
        break;
      default: {
        if (navigation.substr(0, navigation.indexOf("?")) === "/genres") {
          var id = navigation.split("?")[1];
          return <Movies id={id} search={""} />;
        }
        break;
      }
    }
  };

  const search = (e) => {
    setSearchString(e);
    setNavigation("/");
  };

  function testGet() {
    console.log("test4");
    axios({
      method: "get",
      url: "https://localhost:44378/api/user/test44",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(
      (response) => {
        console.log("response");
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  return (
    <div className="main-container">
      <Sidebar
        user={user}
        setNavigation={setNavigation}
        navigation={navigation}
        search={search}
        searchString={searchString}
      />
      <div className="main-content">{renderSwitch(navigation)}</div>
    </div>
  );
}
