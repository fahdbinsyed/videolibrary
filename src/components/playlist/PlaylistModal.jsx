import React, { useState } from "react";
import "./playlistModal.css";
import { useData } from "context/Data-context";
import { IoClose } from "react-icons/io5";

export const PlaylistModal = ({ video, onClose }) => {
  const { playlistState, createPlaylist, addVideoToPlaylist, removeVideoFromPlaylist, showToast } = useData();
  const [playlistName, setPlaylistName] = useState("");

  const handleCreatePlaylist = (e) => {
    e.preventDefault();
    if (playlistName.trim()) {
      createPlaylist({ title: playlistName.trim(), description: "" });
      setPlaylistName("");
    } else {
      showToast("Please enter a playlist name", "error");
    }
  };

  const handlePlaylistChange = (e, playlist) => {
    if (e.target.checked) {
      addVideoToPlaylist(playlist._id, video);
    } else {
      removeVideoFromPlaylist(playlist._id, video._id);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Save to Playlist</h3>
          <button className="close-btn" onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <div className="playlist-list">
          {playlistState.playlists.length > 0 ? (
            playlistState.playlists.map((playlist) => (
              <label key={playlist._id} className="playlist-item">
                <input
                  type="checkbox"
                  checked={playlist.videos.some((v) => v._id === video._id)}
                  onChange={(e) => handlePlaylistChange(e, playlist)}
                />
                <span>{playlist.title}</span>
              </label>
            ))
          ) : (
            <p className="no-playlist">No playlists created yet.</p>
          )}
        </div>

        <form className="create-playlist-form" onSubmit={handleCreatePlaylist}>
          <input
            type="text"
            placeholder="Enter playlist name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
          <button type="submit" className="create-btn">
            + Create
          </button>
        </form>
      </div>
    </div>
  );
};
