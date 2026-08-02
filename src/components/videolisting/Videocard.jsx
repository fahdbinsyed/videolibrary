import React, { useState } from "react";
import "./videocard.css";
import { Link, useNavigate } from "react-router-dom";
import { FaListUl, FaTrash } from "react-icons/fa";
import { useData } from "context/Data-context";
import { PlaylistModal } from "../playlist/PlaylistModal";

export function Videocard({ video, onRemove }) {
  const {
    addToHistory,
    showToast,
  } = useData();
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="video-card cursor" onClick={() => {
          addToHistory(video);
          navigate(`/video/${video._id}`);
        }}>
        <div onClick={(e) => e.stopPropagation()}>
          <Link to={`/video/${video._id}`}>
            {video.platform === "youtube" || !video.platform ? (
              <img
                className="video-banner"
                src={`https://i.ytimg.com/vi/${video._id}/hqdefault.jpg`}
                onError={(e) => { e.target.src = `https://i.ytimg.com/vi/${video._id}/0.jpg`; }}
                alt={video.title}
              />
            ) : (
              <img
                className="video-banner"
                src={video.cover_image}
                alt={video.title}
              />
            )}
          </Link>
        </div>
        <div className="card-content">
          <div className="channel-avatar">
            {video.creator.charAt(0).toUpperCase()}
          </div>
          <div className="card-details">
            <div className="card-header">
              <Link
                to={`/video/${video._id}`}
                className="video-title-link"
              >
                <h1 className="video-title" title={video.title}>{video.title}</h1>
              </Link>
            </div>
            <div className="video-card-footer">
              <div className="footer-text">
                <p className="creator">{video.creator}</p>
                <p className="date">{video.uploaded}</p>
              </div>
              <div className="card-actions">
                {onRemove && (
                  <button
                    className="add-to-playlist-btn text-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(video);
                      showToast("Video removed", "success");
                    }}
                    title="Remove from list"
                  >
                    <FaTrash />
                  </button>
                )}
                <button
                  className="add-to-playlist-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPlaylistModal(true);
                  }}
                  title="Save to Playlist"
                >
                  <FaListUl />
                </button>
              </div>
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
}
