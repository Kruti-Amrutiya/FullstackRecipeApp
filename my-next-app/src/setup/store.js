import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk"; // Correct default import
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import logger from "redux-logger";
import rootReducer, { initialState } from "./rootReducer";

const isDev = process.env.NODE_ENV !== "production";

const persistConfig = {
  key: "recipe",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Add Redux DevTools extension support
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// Add middleware
const middleware = [thunk];
if (isDev) {
  middleware.push(logger); // Include logger only in development
}

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(persistedReducer, initialState, enhancer);

const persistor = persistStore(store);

export default store;
export { persistor };
