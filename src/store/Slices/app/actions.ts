import { TModalProps } from "../../../components/Modal/types";

export const ACTION_APP_ISLOADING_CHANGE = "app.isLoading/change";
export const changeIsLoadingAC = (value: boolean) => ({ type: ACTION_APP_ISLOADING_CHANGE, payload: value });

export const ACTION_APP_MODAL_SHOW = "app.modal/show";
export const showModalAC = (props: TModalProps) => ({ type: ACTION_APP_MODAL_SHOW, payload: props });

export const ACTION_APP_MODAL_HIDE = "app.modal/hide";
export const hideModalAC = () => ({ type: ACTION_APP_MODAL_HIDE });
