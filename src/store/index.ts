import {
    AnyAction,
    combineReducers,
    configureStore,
    createAction,
    Reducer,
  } from "@reduxjs/toolkit";
  import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
  import { loginSlice } from "./loginSlice";
  import { usersSlice } from "./usersSlice";
  import localStorage from "redux-persist/lib/storage";
  import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
  } from "redux-persist";

  const authPersistConfig = {
    key: loginSlice.name,
    version: 1,
    storage: localStorage,
  };
  
  const rootReducer = combineReducers({
    [loginSlice.name]: persistReducer(authPersistConfig, loginSlice.reducer),
    [usersSlice.name]: loginSlice.reducer,
    // [slice.name]: slice.reducer,
    // [slice.name]: slice.reducer,
  });
  
  const resettableRootReducer = (
    state: ReturnType<typeof rootReducer>,
    action: AnyAction
  ) => {
    if (action.type === "store/reset") {
      state = {} as ReturnType<typeof rootReducer>;
    }
    return rootReducer(state, action);
  };
  
  export const storeReset = createAction("store/reset");
  
  const persistConfig = {
    key: "root",
    storage: localStorage, // utilizing localStorage for web and electron
    blacklist: [
      // slice.name,
      // slice.name,
      // slice.name,
    ], //add redux slices that dont need to be persisted
    // whitelist: [], // add redux slices that need to be persisted
    transforms: [], // can use to manipulate data like for e.g. encrypting sensitive information like passwords or the entire redux state
  };
  
  const persistedReducer = persistReducer(
    persistConfig,
    resettableRootReducer as Reducer<ReturnType<typeof rootReducer>>
  );
  
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // RTK recommended configurations for redux-persist
          // https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
          ignoredActions: [
            FLUSH,
            REHYDRATE,
            PAUSE,
            PERSIST,
            PURGE,
            REGISTER,
            storeReset.toString(),
          ],
        },
      }),
  });
  
  export const persistor = persistStore(store);
  
  export type RootState = ReturnType<typeof store.getState>;
  
  export type AppDispatch = typeof store.dispatch;
  
  export const useAppDispatch = () => useDispatch<AppDispatch>();
  
  export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  
  export default store;
  