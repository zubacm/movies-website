import React, { useEffect } from "react";
import "../assets/modals.scss";
import $ from "jquery";

export default function VideoModal({ setShowVideoModal, videoSrc }) {
  useEffect(() => {
    $("#root").addClass("inactive");
  }, []);

  const closeVideoModal = () => {
    setShowVideoModal(false);
    $("#root").removeClass("inactive");
  };
  return (
    <>
      <div className="modal-cont">
        <iframe
          class="embed-responsive-item"
          src={`${videoSrc}` + `?autoplay=1`}
          id="video"
          allowscriptaccess="always"
          allow="autoplay"
          allowFullScreen
        ></iframe>
        <div className="x-button" onClick={closeVideoModal}>
          X
        </div>
      </div>
      <div className="cover" onClick={closeVideoModal}></div>
    </>
  );
}
