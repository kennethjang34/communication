import React from "react";
import { Provider } from "react-redux";
import {
    legacy_createStore as createStore,
    compose,
    applyMiddleware,
    combineReducers,
} from "redux";
import thunk from "redux-thunk";

import authReducer from "../redux-store/reducers/authReducer";
import messageReducer from "../redux-store/reducers/messageReducer";
import * as ReactDOM from "react-dom/client";
import App from "./App";

const composeEnhancers =
    (typeof window !== "undefined" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            trace: true,
            traceLimit: 25,
        })) ||
    compose;

export const store = createStore(
    combineReducers({
        auth: authReducer,
        // nav: navReducer,
        message: messageReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
);

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.createRoot(document.getElementById("app")).render(app);