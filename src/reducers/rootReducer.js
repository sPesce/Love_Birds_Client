import {combineReducers} from 'redux';
import {currentUserReducer} from './manageCurrentUser'
import {currentTabReducer} from './manageCurrentTab'

const rootReducer = combineReducers(
  {
    currentTab: currentTabReducer,
    currentUser: currentUserReducer,
  }
)

export default rootReducer;