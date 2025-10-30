import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import quizSlice from "./features/quizzes/quizSlice";
import teamSlice from "./features/team/teamSlice";
import hintsSlice from "./features/hints/hintsSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  quiz: quizSlice,
  team: teamSlice,
  hint: hintsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST"],
        },
      }),
});

export const persistor = persistStore(store);
export type AppStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];
