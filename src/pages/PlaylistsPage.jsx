import React from "react";
import "App.css";
import Navbar from "components/navbar/Navbar";
import Sidebar from "components/sidebar/Sidebar";
import { useData } from "context/Data-context";
import { Link } from "react-router-dom";
import { FaTrash, FaPlayCircle } from "react-icons/fa";

export function PlaylistsPage() {
  const { playlistState, playlistDispatch } = useData();
  const { playlists } = playlistState;

  const handleDeletePlaylist = (playlistId, e) => {
    e.preventDefault();
    playlistDispatch({
      type: "DELETE_PLAYLIST",
      payload: playlistId,
    });
  };

  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="video-listing-header">
          <h1 className="page-heading">Your Playlists</h1>
          
          <div className="video-listing">
            {playlists.length > 0 ? (
              playlists.map((playlist) => (
                <div key={playlist._id} className="video-card glass-container" style={{ padding: '1rem' }}>
                  <Link to={`/playlists/${playlist._id}`} style={{ flex: 1 }}>
                    <div style={{ height: '12.5rem', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', marginBottom: '1rem' }}>
                      <FaPlayCircle style={{ fontSize: '3rem', color: 'var(--accent-color)' }} />
                    </div>
                    <div className="card-header">
                      <h2 className="video-title">{playlist.title}</h2>
                      <button 
                        className="add-to-playlist-btn"
                        onClick={(e) => handleDeletePlaylist(playlist._id, e)}
                        title="Delete Playlist"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <p style={{ color: 'var(--grey)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                      {playlist.videos.length} video(s)
                    </p>
                  </Link>
                </div>
              ))
            ) : (
              <p className="alert-message">You haven't created any playlists yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
