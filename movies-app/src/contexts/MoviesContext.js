import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MoviesContext = React.createContext();

export function useMovies() {
  return useContext(MoviesContext);
}

export function MoviesProvider({ children }) {
  const [genres, setGenres] = useState([]);
  const [movie, setMovie] = useState({});
  const [moviesList, setMoviesList] = useState([]);
  const pageSize = 3;
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getGenres().then((res) => setGenres(res.data));
  }, []);

  async function getRecommendedMovies() {}

  async function addMovie(movie) {
    var genres = [];
    movie.genres.map((genre) => genres.push({ id: genre.value }));
    axios({
      method: "post",
      url: "https://localhost:44378/api/movies/add-movie",
      data: {
        title: movie.title,
        title2: movie.title2,
        synopsis: movie.synopsis,
        image: movie.image,
        genres: genres,
        director: movie.director,
        backgroundImage: movie.backgroundImage,
        runningTime: movie.runningTime,
        published: movie.published,
        pg: movie.pg,
        trailerURL: movie.trailerURL,
      },
    }).then(
      (response) => {
        if (response.data.statusCodeResult === "200") {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      },
      (error) => {
        toast.error(error.response.data);
      }
    );
  }

  const getMovies = (page, genreId, search) => {
    axios({
      method: "get",
      url: `https://localhost:44378/api/movies/get-movies?page=${page}&pageSize=${pageSize}&genreId=${genreId}&search=${search}`,
    }).then(
      (response) => {
        if (response.data.statusCodeResult === "200") {
          if (page === 1) {
            setMoviesList(response.data.movies);
          } else {
            setMoviesList((prevState) => [
              ...prevState,
              ...response.data.movies,
            ]);
          }
          setHasMore(response.data.movies.length > 0);
          console.log("mvs list", moviesList);
        } else {
          toast.error(response.data.message);
        }
      },
      (error) => {
        toast.error(error.response.data);
      }
    );
  };

  const getGenres = async () => {
    return await axios({
      method: "get",
      url: "https://localhost:44378/api/movies/get-genres",
    });
  };

  const getMovie = async () => {};

  const value = {
    addMovie,
    getMovies,
    allGenres: genres,
    getMovies,
    moviesList,
    hasMore,
    setHasMore,
    movie,
    setMovie,
  };

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
}
