import React, { useEffect } from "react";
import "../assets/userprofile.scss";
import "../assets/register.scss";
import useRegisterValidation from "./ValidateRegister";
import useRegisterForm from "./RegisterForm";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function Register() {
  const { ValidateRegister, ValidateInput } = useRegisterValidation();
  const {
    handleChange,
    values,
    handleSubmit,
    errors,
    isSubmitting,
  } = useRegisterForm(ValidateRegister, ValidateInput);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="reg-container">
          {isSubmitting ? (
            <i class="fa fa-cog fa-spin fa-5x icon-col"></i>
          ) : (
            <div className="register-card">
              <h3>Registration</h3>
              <div className="inpt-cont">
                <input
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  className={`inpt ${errors.username ? "error-input" : ""}`}
                  type="text"
                  placeholder="Enter Username"
                />
                {errors.username && (
                  <small className="text-danger">{errors.username}</small>
                )}
              </div>
              <div className="inpt-cont">
                <input
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  className={`inpt ${errors.password ? "error-input" : ""}`}
                  type="password"
                  placeholder="Enter Password"
                />
                {errors.password && (
                  <small className="text-danger">{errors.password}</small>
                )}
              </div>
              <div className="inpt-cont">
                <input
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  className={`inpt ${
                    errors.confirmPassword ? "error-input" : ""
                  }`}
                  type="password"
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && (
                  <small className="text-danger">
                    {errors.confirmPassword}
                  </small>
                )}
              </div>
              <button type="submit" className="sbmt-btn">
                Register
              </button>
              <Link to="/login" className="link">
                Already have an account?
              </Link>
              <ToastContainer />
            </div>
          )}
        </div>
      </form>
    </>
  );
}
