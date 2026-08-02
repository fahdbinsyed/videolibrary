import React, { useState, useRef } from "react";
import "App.css";
import Navbar from "components/navbar/Navbar";
import Sidebar from "components/sidebar/Sidebar";
import { Videocard } from "components/videolisting/Videocard";
import { useSearchParams } from "react-router-dom";
import { useData } from "context/Data-context";
import { AddVideoModal } from "components/addvideo/AddVideoModal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Homepage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search")?.toLowerCase() || "";
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { videoList, setVideoList, showToast } = useData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  const categoryFilteredVideos = selectedCategory === "All" 
    ? videoList 
    : videoList.filter((video) => video.category === selectedCategory);

  const filteredVideos = query
    ? categoryFilteredVideos.filter((video) => 
        video.title.toLowerCase().includes(query) || 
        video.creator.toLowerCase().includes(query)
      )
    : categoryFilteredVideos;

  const categories = ["All", ...new Set(videoList.map(v => v.category))];

  const handleAddVideo = (newVideo) => {
    setVideoList((prev) => [newVideo, ...prev]);
    showToast("Video added successfully!", "success");
  };

  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="video-listing-header">
          {!query && (
            <div className="category-header">
              <button className="scroll-btn" onClick={scrollLeft}>
                <FaChevronLeft />
              </button>
              <div className="category-scroll-wrapper">
                <div className="category-items" ref={scrollRef}>
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
              </div>
              <button className="scroll-btn" onClick={scrollRight}>
                <FaChevronRight />
              </button>
              <button 
                className="add-video-btn chips" 
                onClick={() => setIsAddModalOpen(true)}
              >
                + Add Video
              </button>
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
      <AddVideoModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        onAddVideo={handleAddVideo}
        categories={categories.filter(c => c !== "All")}
      />
    </div>
  );
}

export default Homepage;
