import accountIssues from '../helpers/accountIssues'

export const notificationsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_NOTIFICATIONS":
      {
        return {
          ...state,  
            ...action.currentUser,
            notifications: accountIssues(action.currentUser.validated,action.currentUser.account_complete)
          }
        
      }
    default:
      return state;
  }
};