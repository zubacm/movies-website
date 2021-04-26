import { useEffect, useState } from "react";
import { useMovies } from "../../../contexts/MoviesContext";

const useAddMovieForm = (ValidateAddMovie, ValidateInput) => {
  const { addMovie, successAdding } = useMovies();

  const [values, setValues] = useState({
    title: "",
    title2: "",
    rating: null,
    synopsis: "",
    image: "",
    genres: [],
    director: "",
    backgroundImage: "",
    runningTime: "",
    runningTimeH: "",
    runningTimeMin: "",
    published: "",
    pg: "",
    trailerURL: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState();

  // const handleChange = (e) => {
  //   setValues({ ...values, [e.target.name]: e.target.value });
  //   var inputError = ValidateInput(e.target.name, e.target.value);
  //   setErrors({ ...errors, [e.target.name]: inputError });
  // };

  const handleChanges = (name, value) => {
    setValues({ ...values, [name]: value });
    var inputError = ValidateInput(name, value);
    setErrors({ ...errors, [name]: inputError });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    var allErrors = ValidateAddMovie(values);
    setErrors(allErrors);
    var anyErrors = Object.values(allErrors).some(
      (x) => x !== undefined && x !== ""
    );

    if (!anyErrors) {
      values.runningTime = `${values.runningTimeH}h ${values.runningTimeMin}min`;

      addMovie(values);
      clearInput();
    }

    setIsSubmitting(false);
  };

  const clearInput = () => {
    var val = {
      title: "",
      title2: "",
      rating: null,
      synopsis: "",
      image: "",
      genres: [],
      director: "",
      backgroundImage: "",
      runningTime: "",
      runningTimeH: "",
      runningTimeMin: "",
      published: "",
      pg: "",
      trailerURL: "",
    };

    setValues(val);
  };

  return {
    values,
    handleSubmit,
    errors,
    isSubmitting,
    handleChanges,
  };
};

export default useAddMovieForm;
