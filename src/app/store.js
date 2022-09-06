import { configureStore, combineReducers } from '@reduxjs/toolkit';
import botReducer from '../features/bot/botSlice';
import homeReducer from '../features/home/homeSlice';
import authReducer from '../features/auth/authSlice';
import proxyReducer from '../features/proxy/proxySlice';

const combinedReducers = combineReducers({
  auth: authReducer,
  bot: botReducer,
  home: homeReducer,
  proxy: proxyReducer,
})

const rootReducer = (state, action) => {
  if(action.type === 'auth/reset'){
    state = undefined
  }
}

export default configureStore({
  reducer:rootReducer
})
export const store = configureStore({
  reducer: {
    auth: authReducer,
    bot: botReducer,
    home: homeReducer,
    proxy: proxyReducer,
  },
});
