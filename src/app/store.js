import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { apiSlice } from "../feature/api/apiSlice";
import authReducer  from "../feature/auth/authSlice";
import  videoPlayerReducer  from "../feature/videoPlayer/videoPlayerSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    activeVideoUrl: videoPlayerReducer,
    // users:userReducer,
  },
  devTools: import.meta.env.VITE_ENV !== "PRODUCTION",
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
