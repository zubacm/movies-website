import React, { useEffect, useState, useRef, useCallback } from "react";
import { useMovies } from "../../contexts/MoviesContext";
import ModalView from "../../modal/Modal";
import MovieItem from "./movie-item";
import $ from "jquery";

export default function Movies({ id, search }) {
  const { moviesList, getMovies, hasMore, setHasMore } = useMovies();
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    if (!isFetching) return;

    getMovies(page, id, search);
    setIsFetching(false);
    setPage((prev) => prev + 1);
  }, [isFetching]);

  useEffect(() => {
    $(".main-content")[0].scrollTop = 0;
    setHasMore(true);
    getMovies(1, id, search);
    setPage(2);
  }, [id, search]);

  const observer = useRef();

  const lastElementRef = useCallback((node) => {
    if (isFetching) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        //setIsFetchingProducts(true);
        setIsFetching(true);
        console.log("visible");
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  const showVideo = (videoSrc) => {
    // when the modal is opened autoplay it
    $("#myModal").on("shown.bs.modal", function (e) {
      // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
      $("#video").attr(
        "src",
        videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
      );
    });

    // stop playing the youtube video when I close the modal
    $("#myModal").on("hide.bs.modal", function (e) {
      // a poor man's stop video
      $("#video").attr("src", videoSrc);
    });
  };

  return (
    <>
      <div id="wrapper" className="movies-wrapper" ref={scrollRef}>
        {moviesList.map((movie, index) => (
          <>
            {moviesList.length === index + 1 ? (
              <span ref={lastElementRef}>
                {" "}
                {/* ref ne može na ovu dole komponentu mora na normalan html element*/}
                <MovieItem movie={movie} showVideo={showVideo} />
              </span>
            ) : (
              <MovieItem movie={movie} showVideo={showVideo} />
            )}
          </>
        ))}
        {hasMore && (
          <div className="spin-container">
            <i class="fa fa-cog fa-spin fa-5x icon-col"></i>
          </div>
        )}

        <ModalView />
      </div>
    </>
  );
}
