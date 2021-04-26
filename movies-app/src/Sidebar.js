import React, { useEffect, useState } from "react";
import $ from "jquery";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { useMovies } from "./contexts/MoviesContext";
import "./assets/search.scss";

export default function Sidebar({
  user,
  setNavigation,
  navigation,
  search,
  searchString,
}) {
  const { logout } = useAuth();
  const { allGenres } = useMovies();
  const { userHasRole } = useAuth();

  const history = useHistory();

  function navigateTo(e) {
    var selected = $(e.currentTarget).attr("eventKey");

    switch (selected) {
      case "/logout": {
        logout();
        break;
      }
      case "/login": {
        history.push(selected);
        break;
      }
      default: {
        setNavigation(selected);
      }
    }
  }

  $(document).ready(function () {
    $(".sub-menu-list").hide();
  });

  function toggleSidebar(e) {
    var target = e
      ? $(e.currentTarget).parent(".sidebar-container")
      : $("#main-sidebar");
    target.toggleClass("sidebar-spread");
    target.find(".sidebar-nav-text").toggleClass("display");
    target.find("#toggle-icon").toggleClass("fa-times fa-bars");

    target.find(".sub-menu-list").toggleClass("sub-menu-items-contained");
  }

  function toggleSub(e) {
    $(e.currentTarget)
      .parent(".sub-menu")
      .children(".sub-menu-list")
      .slideToggle("100");
    $(e.currentTarget)
      .find(".toggle-i")
      .toggleClass("fa-angle-up fa-angle-down");
  }

  return (
    <>
      <div className="sidebar-container" id="main-sidebar">
        <div
          className="sidebar-item"
          id="toggle-btn"
          onClick={(e) => toggleSidebar(e)}
        >
          <i className="fa fa-bars fa-2x" id="toggle-icon"></i>
        </div>
        <div
          eventKey="/home"
          className={`sidebar-item ${navigation == "/home" ? " active" : ""}`}
          onClick={(e) => navigateTo(e)}
        >
          <i className="fa fa-home fa-2x sidebar-icon"></i>
          <span className="sidebar-nav-text">Home</span>
        </div>
        <div className="sub-menu">
          <div
            className="sidebar-item sidebar-drop"
            onClick={(e) => toggleSub(e)}
          >
            <i className="fa fa-film fa-2x sidebar-icon"></i>
            <span className="sidebar-nav-text">
              Genres <i className="toggle-i fa fa-angle-down"></i>
            </span>
          </div>
          <div className="sub-menu-list sub-menu-items-contained">
            {allGenres.map((genre) => (
              <div
                className="sidebar-sub-item sidebar-sub-nav-text"
                id={genre.id}
                eventKey={`/genres?${genre.id}`}
                onClick={(e) => navigateTo(e)}
              >
                {genre.name}
              </div>
            ))}
          </div>
        </div>

        {user && (
          <div
            className={`sidebar-item ${
              navigation == "/add-movie" ? " active" : ""
            }`}
            eventKey="/add-movie"
            onClick={(e) => navigateTo(e)}
          >
            <i className="fa fa-plus-square fa-2x sidebar-icon"></i>
            <span className="sidebar-nav-text">Add Movie</span>
          </div>
        )}
        {user && (
          <div
            className={`sidebar-item ${
              navigation == "/user-profile" ? " active" : ""
            }`}
            eventKey="/user-profile"
            onClick={(e) => navigateTo(e)}
          >
            <i className="fa fa-user fa-2x sidebar-icon"></i>
            <span className="sidebar-nav-text">User Profile</span>
          </div>
        )}
        {user ? (
          <div
            className={`sidebar-item ${
              navigation == "/logout" ? " active" : ""
            }`}
            eventKey="/logout"
            onClick={(e) => navigateTo(e)}
          >
            <i className="fa fa-fw fa-sign-out fa-2x sidebar-icon"></i>
            <span className="sidebar-nav-text">Logout</span>
          </div>
        ) : (
          <div
            className={`sidebar-item ${
              navigation == "/login" ? " active" : ""
            }`}
            eventKey="/login"
            onClick={(e) => navigateTo(e)}
          >
            <i className="fa fa-fw fa-sign-out fa-2x sidebar-icon"></i>
            <span className="sidebar-nav-text">Login</span>
          </div>
        )}

        {userHasRole("rola") && (
          <div
            className={`sidebar-item ${
              navigation == "/manage-users" ? " active" : ""
            }`}
            eventKey="/manage-users"
            onClick={(e) => navigateTo(e)}
          >
            <i className="fa fa-cog fa-2x sidebar-icon"></i>
            <span className="sidebar-nav-text">Manage</span>
          </div>
        )}

        <div
          className={`sidebar-search sidebar-item ${
            navigation == "/search" ? " active" : ""
          }`}
          eventKey="/search"
        >
          <i className="fa fa-search fa-2x sidebar-icon"></i>
          <div className="sidebar-nav-text search-wrapper">
            <input
              value={searchString}
              onChange={(e) => {
                search(e.target.value);
              }}
              type="text"
              name=""
              placeholder="Search"
            />
          </div>
        </div>
      </div>
    </>
  );
}
