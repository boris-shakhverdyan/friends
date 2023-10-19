import { TState } from "../..";

export const selectAuthUser = (state: TState) => state.auth.user;
