import { TState } from "../..";

export const selectIsLoading = (state: TState) => state.app.isLoading;
export const selectModal = (state: TState) => state.app.modal;
