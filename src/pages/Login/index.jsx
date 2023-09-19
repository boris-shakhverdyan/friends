import { useState } from "react";
import { useSendRequest } from "../../hooks/useSendRequest";
import "./style.scss";

const Login = ({ setAuthUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isSubmited, setIsSubmited] = useState(false);
    const { get } = useSendRequest();

    const onSubmit = (e) => {
        e.preventDefault();
        setIsSubmited(true);

        (async () => {
            const user = (
                await get(`users?username=${username}&password=${password}`)
            )[0];

            if (user.id) {
                setAuthUser(user);
            } else {
                setError("Incorrect username or password");
            }
        })();
    };

    return (
        <div className="login">
            {!isSubmited && (
                <form onSubmit={onSubmit} className="login-form">
                    <input
                        required
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        autoComplete="off"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        required
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button>Login</button>

                    {error ? <p>{error}</p> : null}
                </form>
            )}
        </div>
    );
};

export default Login;
