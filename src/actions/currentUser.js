export const setCurrentUser = currentUser =>
{
  return {
    type: 'SET_CURRENT_USER',
    currentUser
  }
}

export const userLogout = () =>
{
  return {
    type: 'USER_LOGOUT'
  }
}
