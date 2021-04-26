import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const useRegisterForm = (ValidateRegister, ValidateInput) => {
  const { register } = useAuth();

  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  //password -> confirmPassword provjerava
  useEffect(() => {
    var inputError = ValidateInput(
      "confirmPassword",
      values.confirmPassword,
      values
    );
    setErrors({ ...errors, ["confirmPassword"]: inputError });
  }, [values.password]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    var inputError = ValidateInput(e.target.name, e.target.value, values);
    setErrors({ ...errors, [e.target.name]: inputError });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    var allErrors = ValidateRegister(values);
    setErrors(allErrors);

    var anyErrors = Object.values(allErrors).some(
      (x) => x !== undefined && x !== ""
    );

    if (!anyErrors) {
      await register(values.username, values.password);
    }

    setIsSubmitting(false);
  };

  return { handleChange, values, handleSubmit, errors, isSubmitting };
};

export default useRegisterForm;
