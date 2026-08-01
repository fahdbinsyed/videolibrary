import React from "react";
import "App.css";
import Navbar from "components/navbar/Navbar";
import Sidebar from "components/sidebar/Sidebar";
import { useData } from "context/Data-context";
import { useParams, Link } from "react-router-dom";
import { Videocard } from "components/videolisting/Videocard";

export function SinglePlaylistPage() {
  const { playlistId } = useParams();
  const { playlistState } = useData();
  const { playlists } = playlistState;

  const playlist = playlists.find((p) => p._id === playlistId);

  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="video-listing-header">
          {playlist ? (
            <>
              <h1 className="page-heading">{playlist.title}</h1>
              <div className="video-listing">
                {playlist.videos.length > 0 ? (
                  playlist.videos.map((video) => (
                    <Videocard 
                      video={video} 
                      key={video._id} 
                      onRemove={(v) => playlistDispatch({ type: "REMOVE_FROM_PLAYLIST", payload: { playlistId: playlist._id, videoId: v._id } })} 
                    />
                  ))
                ) : (
                  <p className="alert-message">This playlist is empty.</p>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col align-item-c">
              <h1 className="page-heading">Playlist Not Found</h1>
              <Link to="/playlists" className="btn-primary mt-4">Go to Playlists</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
