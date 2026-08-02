import Navbar from "components/navbar/Navbar";
import Sidebar from "components/sidebar/Sidebar";
import React from "react";
import "App.css";
import { useData } from "context/Data-context";
import { Videocard } from "components/videolisting/Videocard";
import { FaTrash } from "react-icons/fa";

const Historypage = () => {
  const {
    historyState: { history },
    removeFromHistory,
    clearHistory
  } = useData();
  let uniqueVideo = [...new Set(history)];
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="video-listing-header">
          <div className="page-header-container">
            <h2 className="page-heading">
              History{" "}
              {uniqueVideo.length !== 0
                ? `(${uniqueVideo.length} ${
                    uniqueVideo.length === 1 ? "Video" : "Videos"
                  })`
                : ""}
            </h2>

            {uniqueVideo.length !== 0 && (
              <button
                className="clear-history-btn"
                onClick={() => {
                  clearHistory();
                }}
              >
                <FaTrash style={{ marginRight: '8px' }} />
                Clear History
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <p className="alert-message">
              Looks like you haven't watched anything yet.
            </p>
          ) : (
            <div className="video-listing">
              {uniqueVideo.reverse().map((video) => {
                return (
                  <Videocard 
                    video={video} 
                    key={video._id} 
                    onRemove={(v) => removeFromHistory(v._id)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Historypage;
