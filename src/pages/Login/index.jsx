import { useState } from "react";
import "./style.scss";

const Login = ({ setAuthUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();

        if (username && password) {
            fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    password,
                }),
            })
                .then((res) => res.json())
                .then((data) =>
                    data.id
                        ? setAuthUser(data)
                        : setError("Incorrect username or password")
                );
        }
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
        </div>
    );
};

export default Login;
