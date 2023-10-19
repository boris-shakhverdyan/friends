import { useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { changeIsLoadingAC } from "../../store/Slices/app/actions";
import Auth from "../../app/Services/Auth";
import { setAuthUserAC } from "../../store/Slices/auth/actions";

const Login = () => {
    const [status, setStatus] = useState<"typing" | "sending" | "sent">("typing");
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("sending");
        dispatch(changeIsLoadingAC(true));

        (async () => {
            const userData = await Auth.attempt(
                (e.target as HTMLFormElement).username.value,
                (e.target as HTMLFormElement).password.value
            );

            if (userData) {
                dispatch(setAuthUserAC(userData));
            } else {
                setError("Incorrect username or password");
            }

            setStatus("sent");
            dispatch(changeIsLoadingAC(false));
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
