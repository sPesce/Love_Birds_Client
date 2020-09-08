export const caretakerReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_CARETAKER":
      {        
        console.log("action",action)
        return {...action.caretaker}       
      }
    case "REMOVE_CARETAKER":    
    default:
      return state;
  }
};