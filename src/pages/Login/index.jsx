import { useContext, useState } from "react";
import AppContext from "../../contexts/AppContext";
import { CHANGE_LOADING_STATUS, SET_AUTH_USER } from "../../App";
import "./style.scss";
import Auth from "../../app/Services/Auth";

const Login = () => {
    const [status, setStatus] = useState("typing");
    const [error, setError] = useState(null);
    const { dispatch } = useContext(AppContext);

    const onSubmit = (e) => {
        e.preventDefault();
        setStatus("sending");
        dispatch({ type: CHANGE_LOADING_STATUS, payload: true });

        (async () => {
            const userData = await Auth.attempt(
                e.target.username.value,
                e.target.password.value
            );

            if (userData) {
                dispatch({ type: SET_AUTH_USER, payload: userData });
            } else {
                setError("Incorrect username or password");
            }

            setStatus("sent");
            dispatch({ type: CHANGE_LOADING_STATUS, payload: false });
        })();
    };

    return (
        <div className="login">
            <form onSubmit={onSubmit} className="login-form">
                <input
                    required
                    type="text"
                    name="username"
                    placeholder="Username"
                    autoComplete="off"
                    disabled={status === "sending"}
                />
                <input
                    required
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="off"
                    disabled={status === "sending"}
                />
                <button disabled={status === "sending"}>Login</button>

                {error ? <p>{error}</p> : null}
            </form>
        </div>
    );
};

export default Login;
