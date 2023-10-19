import { combineReducers, createStore } from "redux";
import { authInitialState, authReducer } from "./Slices/auth";
import { appInitialState, appReducer } from "./Slices/app";

const initial = {
    app: appInitialState,
    auth: authInitialState,
};

export const store = createStore(combineReducers({ app: appReducer, auth: authReducer }), initial);

export type TState = typeof initial;
