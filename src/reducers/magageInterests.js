export const interestsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_INTERESTS":
        return [...action.interests]
    default:
      return state;
  }
};