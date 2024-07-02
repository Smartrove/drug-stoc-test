import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./features/tasks/bookSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { crudApi } from "./api/apiSlice";
import { config } from "../config/config";

const { nodeEnv } = config;

const store = configureStore({
  reducer: {
    [crudApi.reducerPath]: crudApi.reducer,
    book: bookReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(crudApi.middleware),
  devTools: nodeEnv !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

setupListeners(store.dispatch);
