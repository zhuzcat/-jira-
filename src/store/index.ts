import { configureStore } from "@reduxjs/toolkit";
import projectListSlice from "./project-list.slice";

export const rootReducer = {
  projectList: projectListSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
