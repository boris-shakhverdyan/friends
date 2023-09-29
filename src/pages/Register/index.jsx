import { useState } from "react";
import userAPI from "../../api/userAPI";
import User from "../../models/User";
import "./style.scss";
import authAPI from "../../api/authAPI";

const Register = ({ setAuthUser, setIsLoading }) => {
    const [status, setStatus] = useState("typing");
    const [error, setError] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();

        if (e.target.password.value === e.target.password_confirmation.value) {
            setIsLoading(true);
            setStatus("sending");

            (async () => {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.avatar.files[0]);

                reader.onload = async () => {
                    const user = await User.create(
                        e.target.firstName.value,
                        e.target.lastName.value,
                        e.target.email.value,
                        e.target.birthdate.value,
                        e.target.username.value,
                        e.target.password.value,
                        reader.result
                    );

                    const authUser = await authAPI.login(user.username, user.password);
                    
                    setAuthUser(authUser);
                    setIsLoading(false);
                };

                setStatus("sent");
            })();
        } else {
            setError("Password mismatch");
        }
    };

    return (
        <div className="register">
            <form onSubmit={onSubmit} className="register-form">
                <input
                    required
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    autoComplete="off"
                    disabled={status === "sending"}
                />
                <input
                    required
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    autoComplete="off"
                    disabled={status === "sending"}
                />
                <input
                    required
                    type="email"
                    name="email"
                    placeholder="Email"
                    autoComplete="off"
                    disabled={status === "sending"}
                />
                <input
                    required
                    type="date"
                    name="birthdate"
                    placeholder="Birthdate"
                    autoComplete="off"
                    disabled={status === "sending"}
                />
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
                <input
                    required
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirm password"
                    autoComplete="off"
                    disabled={status === "sending"}
                />
                <h3>Avatar</h3>
                <input
                    required
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    name="avatar"
                    id="avatar"
                    disabled={status === "sending"}
                />
                <button disabled={status === "sending"}>Register</button>

                {error ? <p>{error}</p> : null}
            </form>
        </div>
    );
};

export default Register;
