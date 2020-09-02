import accountIssues from '../helpers/accountIssues'

export const currentUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      const {user} = action.user
      user.notifications = accountIssues(user.validated,user.account_complete)
      return user
    default:
      return state;
  }
};