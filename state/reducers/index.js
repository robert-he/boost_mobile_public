import { combineReducers } from 'redux';

import UserInfoReducer from './user_info_reducer';
import APIReducer from './api_reducer';

const rootReducer = combineReducers({
  user: UserInfoReducer,
  api: APIReducer,
});

export default rootReducer;
