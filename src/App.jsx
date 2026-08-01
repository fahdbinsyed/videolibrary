import { Routes, Route } from "react-router-dom";
import {
  Historypage,
  Homepage,
  Likedpage,
  SingleVideoPage,
  Watchlater,
  PlaylistsPage,
  SinglePlaylistPage,
} from "./pages";
import { ToastContainer } from "./components/toast/Toast";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/watchlater" element={<Watchlater />} />
        <Route path="/liked" element={<Likedpage />} />
        <Route path="/history" element={<Historypage />} />
        <Route path="/playlists" element={<PlaylistsPage />} />
        <Route path="/playlists/:playlistId" element={<SinglePlaylistPage />} />
        <Route path="/video/:videoId" element={<SingleVideoPage />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
