import { TModalProps } from "../../../components/Modal/types";
import { ACTION_APP_ISLOADING_CHANGE, ACTION_APP_MODAL_HIDE, ACTION_APP_MODAL_SHOW } from "./actions";

export type TInitialState = {
    isLoading: boolean;
    modal: TModalProps | null;
};

type TActionChangeIsLoading = {
    type: typeof ACTION_APP_ISLOADING_CHANGE;
    payload: boolean;
};

type TActionShowModal = {
    type: typeof ACTION_APP_MODAL_SHOW;
    payload: TModalProps;
};

type TActionHideModal = {
    type: typeof ACTION_APP_MODAL_HIDE;
    payload: TModalProps;
};

export type TAction = TActionChangeIsLoading | TActionShowModal | TActionHideModal;
