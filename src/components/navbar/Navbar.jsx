import React, { useState, useEffect } from "react";
import "./navbar.css";
import { CgProfile } from "react-icons/cg";
import { BiSearch, BiMicrophone } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useData } from "context/Data-context";

import { useAuth } from "context/Auth-context";

export default function Navbar() {
  const { setSidebar } = useData();
  const { user, loginWithGoogle, logout } = useAuth();
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

      <div className="profile-container">
        <div className="premium-avatar" onClick={() => setIsProfileOpen(!isProfileOpen)}>
          {user && user.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="avatar-img" />
          ) : user && user.firstName ? (
            user.firstName.charAt(0).toUpperCase()
          ) : (
            <CgProfile style={{ fontSize: '1.4rem' }} />
          )}
        </div>
        
        {isProfileOpen && (
          <div className="profile-dropdown">
            {user ? (
              <>
                <div className="dropdown-user-info">
                  <p className="dropdown-name">{user.firstName} {user.lastName}</p>
                  <p className="dropdown-email">{user.email}</p>
                </div>
                <hr className="dropdown-divider" />
                <button className="dropdown-item text-danger" onClick={() => { logout(); setIsProfileOpen(false); }}>
                  Sign Out
                </button>
              </>
            ) : (
              <button className="dropdown-item" onClick={() => { loginWithGoogle(); setIsProfileOpen(false); }}>
                Sign in with Google
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
