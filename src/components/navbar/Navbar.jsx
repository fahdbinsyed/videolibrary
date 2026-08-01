import React, { useState, useEffect } from "react";
import "./navbar.css";
import { CgProfile } from "react-icons/cg";
import { BiSearch, BiMicrophone } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useData } from "context/Data-context";

export default function Navbar() {
  const { setSidebar } = useData();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setSearchQuery(query);
    } else {
      setSearchQuery("");
    }
  }, [searchParams]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <GiHamburgerMenu
          className="hamburger-icon"
          onClick={() => setSidebar((prev) => !prev)}
        />
        <img
          src="https://res.cloudinary.com/dgqwptcvp/image/upload/v1649755954/images-removebg-preview_6_mcmvzs.png"
          alt="CricStream Logo"
          className="logo"
        />
        <Link to="/" className="logo-name">
          Library
        </Link>
      </div>
      
      <div className="search-container">
        <form className="search-bar-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
        <button className="search-btn" type="submit" onClick={handleSearchSubmit}>
          <BiSearch />
        </button>
      </div>

      <div className="nav-spacer" style={{ width: "150px" }}></div>
    </div>
  );
}
