import { v4 as uuid } from "uuid";

export const playlistReducer = (state, action) => {
  switch (action.type) {
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.payload,
      };
    case "UPDATE_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
      };
    case "CREATE_PLAYLIST":
      return {
        ...state,
        playlists: [
          ...state.playlists,
          { _id: uuid(), title: action.payload.title, videos: [] },
        ],
      };
    case "DELETE_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.filter((p) => p._id !== action.payload),
      };
    case "ADD_TO_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.map((p) =>
          p._id === action.payload.playlistId
            ? { ...p, videos: [...p.videos, action.payload.video] }
            : p
        ),
      };
    case "REMOVE_FROM_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.map((p) =>
          p._id === action.payload.playlistId
            ? {
                ...p,
                videos: p.videos.filter(
                  (v) => v._id !== action.payload.videoId
                ),
              }
            : p
        ),
      };
    default:
      return state;
  }
};
