import React, { useEffect, useState, useRef, useCallback } from "react";
import { useMovies } from "../../contexts/MoviesContext";
import MovieItem from "./movie-item";
import $ from "jquery";
import VideoModal from "../../modal/VideoModal";

export default function Movies({ id, search }) {
  const { moviesList, getMovies, hasMore, setHasMore } = useMovies();
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const scrollRef = useRef();
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [modalVideo, setModalVideo] = useState();

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
    setShowVideoModal(true);
    setModalVideo(videoSrc);
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

        {showVideoModal && (
          <VideoModal
            setShowVideoModal={setShowVideoModal}
            videoSrc={modalVideo}
          />
        )}
      </div>
    </>
  );
}
