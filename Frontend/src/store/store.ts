import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../slice/api/authApi";
import { api } from "../slice/api/api";
import notificationSlice from "../slice/services/notification";
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [api.reducerPath]: api.reducer,
    [notificationSlice.reducerPath]: notificationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
