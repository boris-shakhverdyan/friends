import { ACTION_AUTH_USER_SET } from "./actions";
import { TAction, TInitialState } from "./types";

export const initial: TInitialState = {
    user: null,
};

export const reducer = (state: TInitialState = initial, action: TAction) => {
    switch (action.type) {
        case ACTION_AUTH_USER_SET:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};
