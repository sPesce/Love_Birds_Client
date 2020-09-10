import {combineReducers} from 'redux';
import {currentUserReducer} from './manageCurrentUser'
import {currentTabReducer} from './manageCurrentTab'
import {interestsReducer} from './magageInterests'
import {disabilitiesReducer} from './manageDisabilities'
import {caretakerReducer} from './manageCaretaker'
import { matchesReducer } from './manageMatches';

const rootReducer = combineReducers(
  {
    currentTab: currentTabReducer,
    currentUser: currentUserReducer,
    disabilities: disabilitiesReducer,
    interests: interestsReducer,
    caretaker: caretakerReducer,
    matches: matchesReducer
  }
)

export default rootReducer;