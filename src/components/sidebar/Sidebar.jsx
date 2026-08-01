import React from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaHeart,
  FaClock,
  FaHistory,
  FaListUl,
} from "react-icons/fa";
import { useData } from "context/Data-context";

export default function Sidebar() {
  const { sidebar } = useData();
  const getActiveLinkStyle = ({ isActive }) => ({
    backgroundColor: isActive ? "var(--surface-hover)" : "transparent",
    color: "var(--primary-color)",
    fontWeight: isActive ? "500" : "400",
    borderRadius: "10px",
  });
  return (
    <div className={`sidebar ${sidebar ? "trans-on" : "trans-off"}`}>
      <NavLink to="/" className="sidebar-icon" style={getActiveLinkStyle}>
        <FaHome className="icons" /> Home
      </NavLink>
      <NavLink to="/playlists" className="sidebar-icon" style={getActiveLinkStyle}>
        <FaListUl className="icons" /> Playlists
      </NavLink>
      <NavLink to="/liked" className="sidebar-icon" style={getActiveLinkStyle}>
        <FaHeart className="icons" /> Liked
      </NavLink>
      <NavLink
        to="/watchlater"
        className="sidebar-icon"
        style={getActiveLinkStyle}
      >
        <FaClock className="icons" /> Watch Later
      </NavLink>
      <NavLink
        to="/history"
        className="sidebar-icon"
        style={getActiveLinkStyle}
      >
        <FaHistory className="icons" /> History
      </NavLink>
    </div>
  );
}
