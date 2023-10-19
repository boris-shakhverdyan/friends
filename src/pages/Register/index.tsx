import { useState } from "react";
import { useDispatch } from "react-redux";
import Auth from "../../app/Services/Auth";
import { setAuthUserAC } from "../../store/Slices/auth/actions";
import "./style.scss";
import { changeIsLoadingAC } from "../../store/Slices/app/actions";

const Register = () => {
    const [status, setStatus] = useState<"typing" | "sending" | "sent">("typing");
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { firstName, lastName, email, birthdate, username, password, password_confirmation, avatar } =
            e.target as HTMLFormElement;

        if (password.value === password_confirmation.value) {
            dispatch(changeIsLoadingAC(true));
            setStatus("sending");

            (async () => {
                const reader = new FileReader();
                reader.readAsDataURL(avatar.files[0]);

                reader.onload = async () => {
                    const authUser = await Auth.createAndLogin({
                        firstName: firstName.value,
                        lastName: lastName.value,
                        email: email.value,
                        birthdate: birthdate.value,
                        username: username.value,
                        password: password.value,
                        avatar: reader.result,
                    });

                    dispatch(setAuthUserAC(authUser));
                    dispatch(changeIsLoadingAC(false));

                    setStatus("sent");
                };
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
                    disabled={status === "sending"}
                />
                <button disabled={status === "sending"}>Register</button>

                {error ? <p>{error}</p> : null}
            </form>
        </div>
    );
};

export default Register;
