import User from "../../../app/Models/User";
import { ACTION_AUTH_USER_SET } from "./actions";

export type TInitialState = {
    user: User | null;
};

export type TAction = {
    type: typeof ACTION_AUTH_USER_SET;
    payload: User | null;
};
