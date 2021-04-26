import React, { useEffect, useState } from "react";
import useAddMovieValidation from "./ValidateAddMovie";
import "../../../assets/add-movie.css";
import { Button, Row } from "react-bootstrap";
import Select from "react-select";
import { useMovies } from "../../../contexts/MoviesContext";
import useAddMovieForm from "./AddMovieForm";

export default function AddMovie() {
  const { ValidateAddMovie, ValidateInput } = useAddMovieValidation();
  const {
    values,
    handleSubmit,
    errors,
    isSubmitting,
    handleChanges,
  } = useAddMovieForm(ValidateAddMovie, ValidateInput);
  const [genreOptions, setGenreOptions] = useState([]);
  const { allGenres } = useMovies();

  useEffect(() => {
    //if(genreOptions.length > 0 ) return
    var options = [];
    allGenres.map((genre) =>
      options.push({ value: genre.id, label: genre.name })
    );
    setGenreOptions(options);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="addm-container">
        {isSubmitting ? (
          <div className="icon-container">
            <i className="fa fa-cog fa-spin fa-5x icon-col"></i>
          </div>
        ) : (
          <div className="addm-card">
            <div className="input_cont">
              <input
                value={values.title}
                onChange={(e) => {
                  handleChanges(e.target.name, e.target.value);
                }}
                name="title" //name kupi u AddMovieForm.js
                type="text"
                className={`input_txt_inpt ${
                  errors.title ? "error-input" : ""
                }`}
                placeholder="Enter Title"
              />
              {errors.title && (
                <small className="text-danger" style={{ display: "block" }}>
                  {errors.title}
                </small>
              )}
            </div>
            <div className="input_cont">
              <input
                value={values.title2}
                onChange={(e) => {
                  handleChanges(e.target.name, e.target.value);
                }}
                type="text"
                name="title2"
                className={`input_txt_inpt`}
                placeholder="Enter second title"
              />
            </div>
            <div className="input_cont">
              <input
                value={values.director}
                onChange={(e) => {
                  handleChanges(e.target.name, e.target.value);
                }}
                type="text"
                name="director"
                className={`input_txt_inpt ${
                  errors.director ? "error-input" : ""
                }`}
                placeholder="Enter director"
              />
              {errors.director && (
                <small className="text-danger" style={{ display: "block" }}>
                  {errors.director}
                </small>
              )}
            </div>
            <div className="input_cont">
              <textarea
                value={values.synopsis}
                onChange={(e) => {
                  handleChanges(e.target.name, e.target.value);
                }}
                type="text"
                name="synopsis"
                className={`input_txt_area ${
                  errors.synopsis ? "error-input" : ""
                }`}
                placeholder="Enter synopsis"
              ></textarea>
              {errors.synopsis && (
                <small className="text-danger" style={{ display: "block" }}>
                  {errors.synopsis}
                </small>
              )}
            </div>
            <div className="input_cont">
              <input
                value={values.image}
                onChange={(e) => {
                  handleChanges(e.target.name, e.target.value);
                }}
                type="text"
                name="image"
                className={`input_txt_inpt`}
                placeholder="Enter image url"
              />
            </div>
            <div className="img-wrapper">
              <img src={values.image} alt="" />
            </div>
            <div className="input_cont">
              <input
                value={values.backgroundImage}
                onChange={(e) => {
                  handleChanges(e.target.name, e.target.value);
                }}
                type="text"
                name="backgroundImage"
                className={`input_txt_inpt`}
                placeholder="Enter background image url"
              />
            </div>
            <div className="img-wrapper">
              <img src={values.backgroundImage} alt="" />
            </div>
            <div className="input_cont">
              <input
                value={values.trailerURL}
                onChange={(e) => {
                  handleChanges(e.target.name, e.target.value);
                }}
                type="text"
                name="trailerURL"
                className={`input_txt_inpt`}
                placeholder="Enter trailer url"
              />
            </div>
            <div className="input_cont">
              <input
                value={values.published}
                onChange={(e) => {
                  handleChanges(e.target.name, e.target.value);
                }}
                type="text"
                name="published"
                className={`input_txt_input_inline`}
                placeholder="Enter year of publishing"
              />
              <input
                value={values.pg}
                onChange={(e) => {
                  handleChanges(e.target.name, e.target.value);
                }}
                type="text"
                name="pg"
                className={`input_txt_input_inline last`}
                placeholder="Enter pg"
              />
              <br />
              {errors.published && (
                <small
                  className="text-danger inline-error"
                  style={{ float: "left" }}
                >
                  {errors.published}
                </small>
              )}
            </div>
            <div className="input_cont">
              <input
                value={values.runningTimeH}
                onChange={(e) => {
                  handleChanges(e.target.name, e.target.value);
                }}
                type="text"
                name="runningTimeH"
                className={`input_txt_input_inline`}
                placeholder="Running time hours"
              />
              <input
                value={values.runningTimeMin}
                onChange={(e) => {
                  handleChanges(e.target.name, e.target.value);
                }}
                type="text"
                name="runningTimeMin"
                className={`input_txt_input_inline last`}
                placeholder="Running time minutes"
              />
              <br />
              {errors.runningTimeH && (
                <small className="text-danger inline-error">
                  {errors.runningTimeH}
                </small>
              )}
              {errors.runningTimeMin && (
                <small className="text-danger inline-error">
                  {errors.runningTimeMin}
                </small>
              )}
            </div>
            <Select
              isMulti
              name="genres"
              value={values.genres}
              onChange={(e) => {
                handleChanges("genres", e);
              }}
              options={genreOptions}
              className="basic-multi-select slct input_cont"
              classNamePrefix="select"
            />
            <Button type="submit" className="btn-danger login-btn">
              Submit
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}
