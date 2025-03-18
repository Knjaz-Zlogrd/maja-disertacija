import {
  AnyAction,
  combineReducers,
  configureStore,
  createAction,
  Reducer,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { loginSlice } from "./loginSlice";
import { meetingSlice } from "./meetingSlice";
import { userApi } from "./api/userApi"; // Import RTK Query API
import localStorage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
} from "redux-persist";
import { meetingApi } from "./api/meetingApi";

// Persist login state only
const authPersistConfig = {
  key: "auth",
  version: 1,
  storage: localStorage,
};

const rootReducer = combineReducers({
  [loginSlice.name]: persistReducer(authPersistConfig, loginSlice.reducer),
  [meetingSlice.name]: meetingSlice.reducer,
  [userApi.reducerPath]: userApi.reducer, // ✅ Add RTK Query API reducer
  [meetingApi.reducerPath]: meetingApi.reducer, // ✅ Add RTK Query API reducer
});

// Handle global store reset
const resettableRootReducer: Reducer<ReturnType<typeof rootReducer>> = (
  state,
  action
) => {
  if (action.type === "store/reset") {
    state = {} as ReturnType<typeof rootReducer>;
  }
  return rootReducer(state, action);
};

export const storeReset = createAction("store/reset");

const persistConfig = {
  key: "root",
  storage: localStorage,
  blacklist: [userApi.reducerPath, meetingApi.reducerPath], // ✅ Do not persist API state
};

const persistedReducer = persistReducer(persistConfig, resettableRootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(meetingApi.middleware), // ✅ Add RTK Query middleware
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
