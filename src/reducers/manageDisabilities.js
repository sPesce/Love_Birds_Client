
export const disabilitiesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_DISABILITIES":
      {
        return [...action.disabilities]        
      }    
    default:
      return state;
  }
};