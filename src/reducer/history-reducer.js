export const historyReducer = (state, action) => {
  const { history } = state;
  const { type, payload } = action;
  switch (type) {
    case "SET_HISTORY":
      return {
        ...state,
        history: payload,
      };
    case "ADD_TO_HISTORY":
      return {
        ...state,
        history: [...history, payload],
      };
    case "REMOVE_FROM_HISTORY":
      return {
        ...state,
        history: history.filter((item) => item._id !== payload._id),
      };
    case "CLEAR":
      return {
        history: [],
      };
    default:
      return state;
  }
};
