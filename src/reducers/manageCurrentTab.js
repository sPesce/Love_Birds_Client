export const currentTabReducer = (state = "notifications", action) =>
{
  if(action.type === "SET_CURRENT_TAB")
    return action.currentTab;
  else
    return state;    
}