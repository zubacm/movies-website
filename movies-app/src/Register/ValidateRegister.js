import React from "react";

const useRegisterValidation = () => {
  function ValidateRegister(values) {
    let errors = {};

    errors.username = validateUsername(values.username);
    errors.password = validatePassword(values.password);
    errors.confirmPassword = validateConfirmPassword(
      values.confirmPassword,
      values.password
    );

    return errors;
  }

  const ValidateInput = (target, value, values) => {
    if (target === "username") {
      return validateUsername(value);
    } else if (target === "password") {
      return validatePassword(value);
    } else if (target === "confirmPassword") {
      return validateConfirmPassword(value, values.password);
    }
  };

  function validateUsername(username) {
    if (!username.trim()) {
      return "Username required";
    } else if (username.length < 6) {
      return "Username needs to be 6 characters or more";
    }
  }
  function validatePassword(password, confirmPassword) {
    if (!password.trim()) {
      return "Password required";
    } else if (password.length < 6) {
      return "Password needs to be 6 characters or more";
    }
  }
  function validateConfirmPassword(confirmPassword, password) {
    if (confirmPassword.trim() && confirmPassword !== password) {
      return "Passwords do not match";
    }
  }

  return { ValidateRegister, ValidateInput };
};

export default useRegisterValidation;
