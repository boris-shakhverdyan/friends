import { TUser } from "../../../types/UserType";

export const ACTION_AUTH_USER_SET = "auth.user/set";
export const setAuthUserAC = (user: TUser | null) => ({ type: ACTION_AUTH_USER_SET, payload: user });
