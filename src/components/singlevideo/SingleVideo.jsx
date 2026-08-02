import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import "./singlevideo.css";

import { BiLike } from "react-icons/bi";
import { FaClock, FaListUl } from "react-icons/fa";
import { useData } from "context/Data-context";
import { PlaylistModal } from "../playlist/PlaylistModal";

const SingleVideo = ({ id }) => {
  const {
    videoList,
    likeState: { like },
    likeDispatch,
    watchlaterState: { watchlater },
    watchlaterDispatch,
    historyDispatch,
    showToast,
  } = useData();
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const video = videoList.find((video) => video._id === id);

  useEffect(() => {
    if (video) {
      historyDispatch({
        type: "ADD_TO_HISTORY",
        payload: video,
      });
    }
  }, [video, historyDispatch]);

  if (!video) {
    return <div className="player-wrapper">Video not found.</div>;
  }

  return (
    <>
      <div className="player-wrapper" key={video._id}>
        <div className="video-player-container">
          {(!video.platform || video.platform === "youtube") && (
            <ReactPlayer
              width="100%"
              height="100%"
              className="react-player"
              url={`https://www.youtube.com/watch?v=${video._id}`}
              controls={true}
            />
          )}
          {video.platform === "soundcloud" && (
            <iframe
              width="100%"
              height="100%"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${video._id}&color=%238b5cf6&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}
              title={video.title}
              style={{ borderRadius: "12px" }}
            ></iframe>
          )}
          {video.platform === "spreaker" && (
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              src={`https://widget.spreaker.com/player?show_id=${video._id}&theme=dark&autoplay=false&playlist=show`}
              title={video.title}
              style={{ borderRadius: "12px", minHeight: "400px" }}
            ></iframe>
          )}
        </div>
        <div className="video-details mt-4">
          <h2 className="p-top-1">{video.title}</h2>
          <p className="p-top-5px f-w-500 creator">{video.creator}</p>
          <div className="icons-container">
            <span
              className={`chips ${like.find((item) => item._id === video._id) ? "chip-active" : ""
                }`}
              onClick={() => {
                const isLiked = like.find((item) => item._id === video._id);
                likeDispatch({
                  type: "TOGGLE_LIKE",
                  payload: video,
                });
                showToast(isLiked ? "Removed from Liked Videos" : "Added to Liked Videos", "success");
              }}
            >
              <BiLike />
              {like.find((item) => item._id === video._id) ? "Liked" : "Like"}
            </span>
            <span
              className={`chips ${watchlater.find((item) => item._id === video._id)
                  ? "chip-active"
                  : ""
                }`}
              onClick={() => {
                const isWatchLater = watchlater.find((item) => item._id === video._id);
                watchlaterDispatch({
                  type: "TOGGLE_WATCHLATER",
                  payload: video,
                });
                showToast(isWatchLater ? "Removed from Watch Later" : "Added to Watch Later", "success");
              }}
            >
              <FaClock /> Watch Later
            </span>
            <span
              className="chips"
              onClick={() => setShowPlaylistModal(true)}
            >
              <FaListUl /> Save
            </span>
          </div>
          <hr />
          <p className="p-top-1 f-w-bold">Description:</p>
          <p className="p-top-1 desc-text">{video.description}</p>
        </div>
      </div>
      {showPlaylistModal && (
        <PlaylistModal
          video={video}
          onClose={() => setShowPlaylistModal(false)}
        />
      )}
    </>
  );
};

export default SingleVideo;
