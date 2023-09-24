import { useState } from "react";
import { useSendRequest } from "../../hooks/useSendRequest";
import "./style.scss";

const Login = ({ setAuthUser, setIsLoading }) => {
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("admin");
    const [error, setError] = useState(null);
    const { get } = useSendRequest();

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        (async () => {
            const user = (
                await get(`users?username=${username}&password=${password}`)
            )[0];

            if (user?.id) {
                setAuthUser(user);
            } else {
                setError("Incorrect username or password");
            }

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
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <input
                    required
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button>Login</button>

                {error ? <p>{error}</p> : null}
            </form>
        </div>
    );
};

export default Login;
