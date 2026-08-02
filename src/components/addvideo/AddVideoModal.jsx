import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { FaTimes } from "react-icons/fa";
import "./addvideo.css";

export const AddVideoModal = ({ isOpen, onClose, onAddVideo, categories = [] }) => {
  const [formData, setFormData] = useState({
    title: "",
    creator: "",
    category: "World Cup",
    videoUrl: "",
    description: "Added by user."
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let videoId = "";
    let platform = "youtube";
    let type = "video";
    let cover_image = "";

    try {
      const urlStr = formData.videoUrl;
      const url = new URL(urlStr);
      
      if (url.hostname.includes("youtube.com")) {
        videoId = url.searchParams.get("v");
        platform = "youtube";
      } else if (url.hostname.includes("youtu.be")) {
        videoId = url.pathname.slice(1);
        platform = "youtube";
      } else if (url.hostname.includes("soundcloud.com")) {
        const trackUrl = url.searchParams.get("url");
        if (trackUrl && trackUrl.includes("tracks/")) {
           videoId = trackUrl.split("tracks/")[1].split("&")[0];
        }
        platform = "soundcloud";
        type = "audio";
        cover_image = "https://images.unsplash.com/photo-1510511459019-5d05b47f5e6b?auto=format&fit=crop&q=80&w=800";
      } else if (url.hostname.includes("spreaker.com")) {
        videoId = url.searchParams.get("show_id") || url.searchParams.get("episode_id");
        platform = "spreaker";
        type = "audio";
        cover_image = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800";
      }
    } catch(err) {
      console.error("Invalid URL or raw ID provided");
    }

    const finalVideoId = videoId || uuid();

    const newVideo = {
      _id: finalVideoId,
      title: formData.title,
      description: formData.description,
      creator: formData.creator,
      category: formData.category,
      video: videoId || formData.videoUrl,
      platform: platform,
      uploaded: new Date().toDateString(),
      type: type,
      ...(cover_image && { cover_image })
    };

    onAddVideo(newVideo);
    
    // Reset form
    setFormData({
      title: "",
      creator: "",
      category: "World Cup",
      videoUrl: "",
      description: "Added by user."
    });
    
    onClose();
  };

  return (
    <div className="add-modal-overlay" onClick={onClose}>
      <div 
        className="add-modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="add-modal-header">
          <h2>Add New Video</h2>
          <button 
            className="close-btn" 
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Media Embed URL (YouTube, SoundCloud, Spreaker)</label>
            <input 
              type="url" 
              name="videoUrl"
              placeholder="e.g. https://www.youtube.com/watch?v=..."
              value={formData.videoUrl}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label>Video Title</label>
            <input 
              type="text" 
              name="title"
              placeholder="Enter title"
              value={formData.title}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label>Creator</label>
            <input 
              type="text" 
              name="creator"
              placeholder="Channel name"
              value={formData.creator}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <div className="category-chips-container">
              {categories.map((cat) => (
                <button 
                  type="button"
                  key={cat} 
                  className={`category-chip ${formData.category === cat ? "active" : ""}`}
                  onClick={() => setFormData(prev => ({...prev, category: cat}))}
                >
                  {cat}
                </button>
              ))}
            </div>
            <input 
              type="text"
              name="category"
              placeholder="Or type a new category..."
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="add-modal-actions">
            <button 
              type="button" 
              className="cancel-btn" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-btn"
            >
              Add Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
