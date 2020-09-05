import accountIssues from '../helpers/accountIssues'

export const currentUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      {
        return {
          ...state,  
            ...action.currentUser,
            notifications: accountIssues(action.currentUser.validated,action.currentUser.account_complete)
          }
        
      }
    // case "UPDATE_DISABILITIES":
    //   {
    //     return {
    //       ...state,
    //       currentUser:{
    //         ...state.currentUser,
    //         disabilities: [...action.disabilities]
    //       }
    //     }
    //   }
    // case "UPDATE_INTERESTS":
    //   {       
    //     return {
    //       ...state,
    //       interests: [...action.interests]        
    //     }
    //   }
    default:
      return state;
  }
};