import { TUser } from "../../../types/UserType";
import { ACTION_AUTH_USER_SET } from "./actions";

export type TInitialState = {
    user: TUser | null;
};

export type TAction = {
    type: typeof ACTION_AUTH_USER_SET;
    payload: TUser | null;
};
