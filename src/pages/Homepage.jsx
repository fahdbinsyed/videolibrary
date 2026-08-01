import React, { useState } from "react";
import "App.css";
import Navbar from "components/navbar/Navbar";
import Sidebar from "components/sidebar/Sidebar";
import { videos } from "backend/db/videos";
import { Videocard } from "components/videolisting/Videocard";
import { useSearchParams } from "react-router-dom";

function Homepage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search")?.toLowerCase() || "";
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoryFilteredVideos = selectedCategory === "All" 
    ? videos 
    : videos.filter((video) => video.category === selectedCategory);

  const filteredVideos = query
    ? categoryFilteredVideos.filter((video) => 
        video.title.toLowerCase().includes(query) || 
        video.creator.toLowerCase().includes(query)
      )
    : categoryFilteredVideos;

  const categories = ["All", "World Cup", "IPL", "Others"];

  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="video-listing-header">
          {!query && (
            <div className="category-items">
              {categories.map((category) => (
                <span
                  key={category}
                  className={`chips ${selectedCategory === category ? "chip-active" : ""}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </span>
              ))}
            </div>
          )}
          {query && (
            <h2 className="page-heading">
              Search Results for: "{searchParams.get("search")}"
            </h2>
          )}
          {filteredVideos.length > 0 ? (
            <div className="video-listing">
              {filteredVideos.map((video) => {
                return <Videocard video={video} key={video._id} />;
              })}
            </div>
          ) : (
            <p className="alert-message mt-4">
              No videos found matching your criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
