import accountIssues from '../helpers/accountIssues'

export const notificationsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      {
        return [...state,action.notification]
      }
    default:
      return state;
  }
};