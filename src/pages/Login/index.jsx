import { useContext, useState } from "react";
import authAPI from "../../api1/authAPI";
import "./style.scss";
import AppContext from "../../contexts/AppContext";
import { CHANGE_LOADING_STATUS, SET_AUTH_USER } from "../../App";

const Login = () => {
    const [status, setStatus] = useState("typing");
    const [error, setError] = useState(null);
    const { dispatch } = useContext(AppContext);

    const onSubmit = (e) => {
        e.preventDefault();
        setStatus("sending");
        dispatch({ type: CHANGE_LOADING_STATUS, payload: true });

        (async () => {
            const userData = await authAPI.login(
                e.target.username.value,
                e.target.password.value
            );

            if (userData?.id) {
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
                    id="username"
                    placeholder="Username"
                    autoComplete="off"
                    disabled={status === "sending"}
                />
                <input
                    required
                    type="password"
                    name="password"
                    id="password"
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
