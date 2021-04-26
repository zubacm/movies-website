import { Button, NavLink } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import "../assets/login.css";
import useLoginForm from "./LoginForm";
import useLoginValidation from "./validateLogin";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { ValidateLogin, ValidateInput } = useLoginValidation();
  const {
    handleChange,
    values,
    handleSubmit,
    errors,
    isSubmitting,
  } = useLoginForm(ValidateLogin, ValidateInput);

  let { registered } = useParams();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    if (registered) {
      toast.success("You have successfully registered");
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="login-container">
        {isSubmitting ? (
          <i class="fa fa-cog fa-spin fa-5x icon-col"></i>
        ) : (
          <div className="login-card">
            <div className="input_cont">
              <h3>Login</h3>
              <input
                value={values.username}
                onChange={handleChange}
                name="username" //name kupi u LoginForm.js
                type="text"
                className={`input_txt_inpt ${
                  errors.username ? "error-input" : ""
                }`}
                placeholder="Enter Username"
              />
              {errors.username && (
                <small className="text-danger">{errors.username}</small>
              )}
            </div>
            <div className="input_cont">
              <input
                value={values.password}
                onChange={handleChange}
                type="password"
                name="password"
                className={`input_txt_inpt ${
                  errors.password ? "error-input" : ""
                }`}
                placeholder="Enter Password"
              />
              {errors.password && (
                <small className="text-danger">{errors.password}</small>
              )}
            </div>

            <Button type="submit" className="btn-danger login-btn">
              Login
            </Button>
            <Link to="/register" className="link">
              Don't have account?
            </Link>
            <ToastContainer />
          </div>
        )}
      </div>
    </form>
  );
}
