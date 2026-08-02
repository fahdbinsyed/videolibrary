import React, { createContext, useReducer, useContext, useState, useEffect } from "react";
import { likeReducer } from "reducer/like-reducer";
import { watchlaterReducer } from "reducer/watchLater-reducer";
import { historyReducer } from "reducer/history-reducer";
import { playlistReducer } from "reducer/playlist-reducer";
import { useAuth } from "./Auth-context";
import api from "../services/api";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [sidebar, setSidebar] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);

  const [likeState, likeDispatch] = useReducer(likeReducer, { like: [] });
  const [watchlaterState, watchlaterDispatch] = useReducer(watchlaterReducer, { watchlater: [] });
  const [historyState, historyDispatch] = useReducer(historyReducer, { history: [] });
  const [playlistState, playlistDispatch] = useReducer(playlistReducer, { playlists: [] });

  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  // Fetch Public Data
  useEffect(() => {
    (async () => {
      try {
        const videoRes = await api.get('/videos');
        setVideoList(videoRes.data?.videos || []);
        
        const catRes = await api.get('/categories');
        setCategories(catRes.data?.categories || []);
      } catch (err) {
        console.error("Error fetching public data:", err);
      } finally {
        setLoadingVideos(false);
      }
    })();
  }, []);

  // Fetch User Data when Auth changes
  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const [likesRes, watchLaterRes, historyRes, playlistsRes] = await Promise.all([
            api.get('/user/likes'),
            api.get('/user/watchlater'),
            api.get('/user/history'),
            api.get('/user/playlists')
          ]);
          likeDispatch({ type: "SET_LIKES", payload: likesRes.data.likes });
          watchlaterDispatch({ type: "SET_WATCHLATER", payload: watchLaterRes.data.watchlater });
          historyDispatch({ type: "SET_HISTORY", payload: historyRes.data.history });
          playlistDispatch({ type: "SET_PLAYLISTS", payload: playlistsRes.data.playlists });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      })();
    } else {
      // Clear user data on logout
      likeDispatch({ type: "SET_LIKES", payload: [] });
      watchlaterDispatch({ type: "SET_WATCHLATER", payload: [] });
      historyDispatch({ type: "SET_HISTORY", payload: [] });
      playlistDispatch({ type: "SET_PLAYLISTS", payload: [] });
    }
  }, [token]);

  // Async API Handlers for Likes
  const handleLike = async (video) => {
    if (!token) return showToast("Please login first!", "error");
    const isLiked = likeState.like.find(item => item._id === video._id);
    try {
      if (isLiked) {
        const res = await api.delete(`/user/likes/${video._id}`);
        likeDispatch({ type: "SET_LIKES", payload: res.data.likes });
        showToast("Removed from Liked Videos");
      } else {
        const res = await api.post('/user/likes', { video });
        likeDispatch({ type: "SET_LIKES", payload: res.data.likes });
        showToast("Added to Liked Videos");
      }
    } catch (err) {
      console.error(err);
      showToast("Error updating likes", "error");
    }
  };

  // Async API Handlers for Watch Later
  const handleWatchLater = async (video) => {
    if (!token) return showToast("Please login first!", "error");
    const isWatchLater = watchlaterState.watchlater.find(item => item._id === video._id);
    try {
      if (isWatchLater) {
        const res = await api.delete(`/user/watchlater/${video._id}`);
        watchlaterDispatch({ type: "SET_WATCHLATER", payload: res.data.watchlater });
        showToast("Removed from Watch Later");
      } else {
        const res = await api.post('/user/watchlater', { video });
        watchlaterDispatch({ type: "SET_WATCHLATER", payload: res.data.watchlater });
        showToast("Added to Watch Later");
      }
    } catch (err) {
      console.error(err);
      showToast("Error updating watch later", "error");
    }
  };

  // Async API Handlers for History
  const addToHistory = async (video) => {
    if (!token) return;
    try {
      const res = await api.post('/user/history', { video });
      historyDispatch({ type: "SET_HISTORY", payload: res.data.history });
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromHistory = async (videoId) => {
    try {
      const res = await api.delete(`/user/history/${videoId}`);
      historyDispatch({ type: "SET_HISTORY", payload: res.data.history });
      showToast("Removed from History");
    } catch (err) {
      console.error(err);
    }
  };

  const clearHistory = async () => {
    try {
      const res = await api.delete('/user/history/all');
      historyDispatch({ type: "SET_HISTORY", payload: res.data.history });
      showToast("History Cleared");
    } catch (err) {
      console.error(err);
    }
  };

  // Async API Handlers for Playlists
  const createPlaylist = async (playlist) => {
    if (!token) return showToast("Please login first!", "error");
    try {
      const res = await api.post('/user/playlists', { playlist });
      playlistDispatch({ type: "SET_PLAYLISTS", payload: res.data.playlists });
      showToast("Playlist created!");
    } catch (err) {
      console.error(err);
      showToast("Error creating playlist", "error");
    }
  };

  const removePlaylist = async (playlistId) => {
    try {
      const res = await api.delete(`/user/playlists/${playlistId}`);
      playlistDispatch({ type: "SET_PLAYLISTS", payload: res.data.playlists });
      showToast("Playlist removed");
    } catch (err) {
      console.error(err);
    }
  };

  const addVideoToPlaylist = async (playlistId, video) => {
    try {
      const res = await api.post(`/user/playlists/${playlistId}`, { video });
      playlistDispatch({ type: "UPDATE_PLAYLIST", payload: res.data.playlist });
      showToast("Video added to playlist");
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.errors?.[0] || "Error adding video", "error");
    }
  };

  const removeVideoFromPlaylist = async (playlistId, videoId) => {
    try {
      const res = await api.delete(`/user/playlists/${playlistId}/${videoId}`);
      playlistDispatch({ type: "UPDATE_PLAYLIST", payload: res.data.playlist });
      showToast("Video removed from playlist");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DataContext.Provider
      value={{
        sidebar,
        setSidebar,
        videoList,
        categories,
        loadingVideos,
        likeState,
        watchlaterState,
        historyState,
        playlistState,
        handleLike,
        handleWatchLater,
        addToHistory,
        removeFromHistory,
        clearHistory,
        createPlaylist,
        removePlaylist,
        addVideoToPlaylist,
        removeVideoFromPlaylist,
        toasts,
        showToast,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { DataProvider, useData };
