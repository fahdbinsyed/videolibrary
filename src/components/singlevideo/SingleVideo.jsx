import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import "./singlevideo.css";

import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaClock, FaListUl } from "react-icons/fa";
import { MdWatchLater, MdOutlineWatchLater } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";
import { CgPlayListAdd } from "react-icons/cg";
import { useData } from "context/Data-context";
import { PlaylistModal } from "../playlist/PlaylistModal";

const SingleVideo = ({ id }) => {
  const {
    sidebar,
    videoList,
    likeState: { like },
    watchlaterState: { watchlater },
    handleLike,
    handleWatchLater,
    addToHistory,
    showToast,
  } = useData();
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const video = videoList.find((video) => video._id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (video) {
      addToHistory(video);
    }
  }, [video]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("Link Copied to Clipboard");
  };

  if (!video) {
    return <div className="player-wrapper">Video not found.</div>;
  }

  const isLiked = like.find((item) => item._id === video._id);
  const isWatchLater = watchlater.find((item) => item._id === video._id);

  return (
    <>
      <div className={`single-video-page ${sidebar ? "trans-on" : "trans-off"}`}>
        <div className="player-wrapper">
          <div className="video-player-container">
            {(!video.platform || video.platform === "youtube") && (
              <ReactPlayer
                width="100%"
                height="100%"
                className="react-player"
                url={`https://www.youtube.com/watch?v=${video._id}`}
                controls={true}
                playing={true}
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
          
          <div className="video-details-container">
            <h1 className="video-title">{video.title}</h1>
            
            <div className="video-header-row">
              <div className="creator-info">
                <div className="creator-avatar">
                  {video.creator.charAt(0).toUpperCase()}
                </div>
                <div className="creator-details">
                  <h3 className="creator-name">{video.creator}</h3>
                  <p className="upload-date">{video.uploaded}</p>
                </div>
              </div>

              <div className="video-actions">
                <button 
                  className={`action-btn ${isLiked ? "active" : ""}`}
                  onClick={() => handleLike(video)}
                >
                  {isLiked ? <BiSolidLike /> : <BiLike />}
                  <span>{isLiked ? "Liked" : "Like"}</span>
                </button>
                
                <button className="action-btn" onClick={handleCopyLink}>
                  <RiShareForwardLine />
                  <span>Share</span>
                </button>
                
                <button 
                  className={`action-btn ${isWatchLater ? "active" : ""}`}
                  onClick={() => handleWatchLater(video)}
                >
                  {isWatchLater ? <MdWatchLater /> : <MdOutlineWatchLater />}
                  <span>Watch Later</span>
                </button>
                
                <button className="action-btn" onClick={() => setShowPlaylistModal(true)}>
                  <CgPlayListAdd />
                  <span>Save</span>
                </button>
              </div>
            </div>

            <div className="description-box">
              <h4 className="desc-heading">Description</h4>
              <p className="desc-text">{video.description}</p>
            </div>
          </div>
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
