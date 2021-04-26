import React, { useEffect } from "react";
import "../../assets/movieitems.scss";
import { useMovies } from "../../contexts/MoviesContext";

export default function MovieItem(props) {
  return (
    <>
      <div class="movie">
        <div
          class="movie-img"
          style={{ backgroundImage: `url("${props.movie.image}")` }}
        ></div>
        <div class="text-movie-cont">
          <div class="mr-grid">
            <div class="col1">
              <h1>{props.movie.title}</h1>
              <h3>{props.movie.title2}</h3>
              <ul class="movie-gen">
                <li>{props.movie.pg} /</li>
                <li>{props.movie.published} /</li>
                <li>
                  {props.movie.movieGenres &&
                    props.movie.movieGenres.map((mg) => <>{mg.genre.name} </>)}
                </li>
              </ul>
            </div>
          </div>
          <div class="mr-grid summary-row">
            <div class="col2">
              <h5>SUMMARY</h5>
            </div>
            <div class="col2">
              <ul class="movie-likes">
                <li>
                  <span style={{ fontSize: "1.4em" }}>
                    {props.movie.rating}
                  </span>
                  /10
                </li>
              </ul>
            </div>
          </div>
          <div class="mr-grid">
            <div class="col1">
              <p class="movie-description">{props.movie.synopsis}</p>
            </div>
          </div>
          <div class="mr-grid action-row ">
            <div class="col2">
              <div
                class="watch-btn video-btn"
                data-toggle="modal"
                data-src={props.movie.trailerUrl}
                data-target="#myModal"
                onClick={() => {
                  props.showVideo(props.movie.trailerUrl);
                }}
              >
                <i class="fa fa-play" style={{ marginRight: "3px" }}></i>WATCH
                TRAILER
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
