import { createContext, useReducer, useContext, useState, useEffect } from "react";
import { likeReducer } from "reducer/like-reducer";
import { watchlaterReducer } from "reducer/watchLater-reducer";
import { historyReducer } from "reducer/history-reducer";
import { playlistReducer } from "reducer/playlist-reducer";
import { videos as initialVideos } from "backend/db/videos";
const DataContext = createContext();

const loadFromStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

const DataProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);
  const [videoList, setVideoList] = useState(() => loadFromStorage("videolib_videos", initialVideos));
  const [likeState, likeDispatch] = useReducer(likeReducer, {
    like: loadFromStorage("videolib_like", []),
  });
  const [watchlaterState, watchlaterDispatch] = useReducer(watchlaterReducer, {
    watchlater: loadFromStorage("videolib_watchlater", []),
  });
  const [historyState, historyDispatch] = useReducer(historyReducer, {
    history: loadFromStorage("videolib_history", []),
  });
  const [playlistState, playlistDispatch] = useReducer(playlistReducer, {
    playlists: loadFromStorage("videolib_playlists", []),
  });

  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  useEffect(() => {
    localStorage.setItem("videolib_videos", JSON.stringify(videoList));
  }, [videoList]);

  useEffect(() => {
    localStorage.setItem("videolib_like", JSON.stringify(likeState.like));
  }, [likeState.like]);

  useEffect(() => {
    localStorage.setItem("videolib_watchlater", JSON.stringify(watchlaterState.watchlater));
  }, [watchlaterState.watchlater]);

  useEffect(() => {
    localStorage.setItem("videolib_history", JSON.stringify(historyState.history));
  }, [historyState.history]);

  useEffect(() => {
    localStorage.setItem("videolib_playlists", JSON.stringify(playlistState.playlists));
  }, [playlistState.playlists]);

  return (
    <DataContext.Provider
      value={{
        sidebar,
        setSidebar,
        videoList,
        setVideoList,
        likeState,
        likeDispatch,
        watchlaterState,
        watchlaterDispatch,
        historyState,
        historyDispatch,
        playlistState,
        playlistDispatch,
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
