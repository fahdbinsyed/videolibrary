import React, { useState } from "react";
import "./playlistModal.css";
import { useData } from "context/Data-context";
import { FaTimes, FaPlus } from "react-icons/fa";

export function PlaylistModal({ video, onClose }) {
  const { playlistState, playlistDispatch, showToast } = useData();
  const [playlistName, setPlaylistName] = useState("");
  const { playlists } = playlistState;

  const handleCreatePlaylist = (e) => {
    e.preventDefault();
    if (playlistName.trim()) {
      playlistDispatch({
        type: "CREATE_PLAYLIST",
        payload: { title: playlistName },
      });
      showToast(`Playlist "${playlistName}" created`, "success");
      setPlaylistName("");
    }
  };

  const handleToggleVideo = (playlist) => {
    const isVideoInPlaylist = playlist.videos.some((v) => v._id === video._id);
    if (isVideoInPlaylist) {
      playlistDispatch({
        type: "REMOVE_FROM_PLAYLIST",
        payload: { playlistId: playlist._id, videoId: video._id },
      });
      showToast(`Removed from ${playlist.title}`, "success");
    } else {
      playlistDispatch({
        type: "ADD_TO_PLAYLIST",
        payload: { playlistId: playlist._id, video: video },
      });
      showToast(`Added to ${playlist.title}`, "success");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Save to Playlist</h3>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <div className="playlist-list">
          {playlists.length > 0 ? (
            playlists.map((playlist) => {
              const isVideoInPlaylist = playlist.videos.some((v) => v._id === video._id);
              return (
                <label key={playlist._id} className="playlist-item">
                  <input
                    type="checkbox"
                    checked={isVideoInPlaylist}
                    onChange={() => handleToggleVideo(playlist)}
                  />
                  <span>{playlist.title}</span>
                </label>
              );
            })
          ) : (
            <p className="no-playlist">No playlists created yet.</p>
          )}
        </div>

        <form onSubmit={handleCreatePlaylist} className="create-playlist-form">
          <input
            type="text"
            placeholder="Enter playlist name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            required
          />
          <button type="submit" className="create-btn">
            <FaPlus /> Create
          </button>
        </form>
      </div>
    </div>
  );
}
