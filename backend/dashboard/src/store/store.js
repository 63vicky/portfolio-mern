import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import forgotPasswordReducer from './slices/forgotResetPasswordSlice';
import { messagesReducer } from './slices/messagesSlice';
import { timelineReducer } from './slices/timelineSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    messages: messagesReducer,
    timeline: timelineReducer,
  },
});
