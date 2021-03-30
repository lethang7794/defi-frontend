import { combineReducers } from 'redux';
import habitReducer from './habit.reducer';
import authReducer from './auth.reducer';
import alertReducer from './alert.reducer';
import userReducer from './user.reducer';
import routeReducer from './route.reducer';

export default combineReducers({
  habit: habitReducer,
  auth: authReducer,
  alert: alertReducer,
  user: userReducer,
  route: routeReducer,
});
