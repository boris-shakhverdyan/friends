import { useState } from "react";
import authAPI from "../../api/authAPI";
import "./style.scss";

const Login = ({ setAuthUser, setIsLoading }) => {
    const [status, setStatus] = useState("typing");
    const [error, setError] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();
        setStatus("sending");
        setIsLoading(true);

        (async () => {
            const user = await authAPI.login(
                e.target.username.value,
                e.target.password.value
            );

            if (user?.id) {
                setAuthUser(user);
            } else {
                setError("Incorrect username or password");
            }

            setStatus("sent");
            setIsLoading(false);
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
