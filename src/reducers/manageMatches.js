export const matchesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_MATCHES":
      {
        return [...action.matches]
      }
    case "UPDATE_MATCH":
      {
        return (
          state.map(match => {
            if(action.match.id === match.id)
              return action.match
            else
              return match
          })
        )
      }
    case "ADD_MATCH":
    {
      return[
        ...state,
        {...action.match}
      ]
    }
    default:
      return state;
  }
};