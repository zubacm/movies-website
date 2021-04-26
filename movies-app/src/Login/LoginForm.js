import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const useLoginForm = (validateLogin, validateInput) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    var inputError = validateInput(e.target.name, e.target.value);
    setErrors({ ...errors, [e.target.name]: inputError });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    var allErrors = validateLogin(values); //ako nema errora tamo ga loguje
    setErrors(allErrors);
    setIsSubmitting(false);
  };

  return { handleChange, values, handleSubmit, errors, isSubmitting };
};

export default useLoginForm;
