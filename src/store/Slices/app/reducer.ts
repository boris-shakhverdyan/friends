import { ACTION_APP_ISLOADING_CHANGE, ACTION_APP_MODAL_HIDE, ACTION_APP_MODAL_SHOW } from "./actions";
import { TAction, TInitialState } from "./types";

export const initial: TInitialState = {
    isLoading: true,
    modal: null,
};

export const reducer = (state: TInitialState = initial, action: TAction) => {
    switch (action.type) {
        case ACTION_APP_ISLOADING_CHANGE:
            return {
                ...state,
                isLoading: action.payload,
            };
        case ACTION_APP_MODAL_SHOW:
            return {
                ...state,
                modal: action.payload,
            };
        case ACTION_APP_MODAL_HIDE:
            return {
                ...state,
                modal: null,
            };
        default:
            return state;
    }
};
