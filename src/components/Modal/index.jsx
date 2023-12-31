import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./style.module.scss";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import AppContext from "../../contexts/AppContext";
import { useContext } from "react";
import { CHANGE_MODAL_STATUS } from "../../App";

const Modal = ({
    title,
    onDanger = null,
    onSuccess = null,
    onWarning = null,
    onDefault = null,
    onCancel = null,
    body = null,
    successContent = "Save",
    defaultContent = "Cancel",
    dangerContent = "Delete",
    warningContent = "Edit",
}) => {
    const { dispatch } = useContext(AppContext);

    const buttonClickHandler = (handle = null) => {
        if (handle) {
            handle();
        }

        dispatch({
            type: CHANGE_MODAL_STATUS,
            payload: {
                isActive: false,
            },
        });
    };

    return (
        <div className={classes.modal}>
            <div className={classes.content}>
                <div className={classes.header}>
                    <h3>{title}</h3>
                    <button onClick={() => buttonClickHandler(onCancel)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                {body && <div className={classes.body}>{body}</div>}
                <div className={classes.footer}>
                    {onSuccess && (
                        <button
                            className={classes.success}
                            onClick={() => buttonClickHandler(onSuccess)}
                        >
                            {successContent}
                        </button>
                    )}

                    <button
                        className={classes.default}
                        onClick={() => buttonClickHandler(onDefault)}
                    >
                        {defaultContent}
                    </button>

                    {onDanger && (
                        <button
                            className={classes.danger}
                            onClick={() => buttonClickHandler(onDanger)}
                        >
                            {dangerContent}
                        </button>
                    )}

                    {onWarning && (
                        <button
                            className={classes.warning}
                            onClick={() => buttonClickHandler(onWarning)}
                        >
                            {warningContent}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
