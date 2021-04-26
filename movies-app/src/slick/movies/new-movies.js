import React, { useState, useEffect } from "react";
import MovieItem from "./movie-item";
import { Container } from "react-bootstrap";
import { useMovies } from "../../contexts/MoviesContext";

export default function NewMovies() {
  const [movies, setMovies] = useState([]);
  const { getMovies } = useMovies();

  useEffect(() => {
    console.log("movies");
    setMovies(getMovies());
  }, []);

  return (
    <>
      <h2>NEW ARRIVALS</h2>
      <Container
        className="row"
        style={{ paddingRight: "0", paddingLeft: "0" }}
      >
        {movies.map((movie) => (
          <MovieItem movie={movie} />
        ))}
      </Container>
    </>
  );
}
