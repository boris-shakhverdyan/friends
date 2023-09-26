import { useState } from "react";
import { useSendRequest } from "../../hooks/useSendRequest";
import "./style.scss";

const Register = ({ setAuthUser, setIsLoading }) => {
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        birthdate: "",
        username: "",
        password: "",
        password_confirmation: "",
    });
    const { post } = useSendRequest();

    const setFormValue = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (formData.password === formData.password_confirmation) {
            setIsLoading(true);

            (async () => {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.avatar.files[0]);

                reader.onload = async () => {
                    const user = {
                        id: new Date().getTime(),
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        birthdate: formData.birthdate,
                        username: formData.username,
                        password: formData.password,
                        avatar: reader.result,
                    };

                    await post("users", user);

                    setAuthUser(user);
                    setIsLoading(false);
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
                    id="firstName"
                    placeholder="First name"
                    autoComplete="off"
                    onChange={(e) => setFormValue("firstName", e.target.value)}
                    value={formData.firstName}
                />
                <input
                    required
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last name"
                    autoComplete="off"
                    onChange={(e) => setFormValue("lastName", e.target.value)}
                    value={formData.lastName}
                />
                <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    autoComplete="off"
                    onChange={(e) => setFormValue("email", e.target.value)}
                    value={formData.email}
                />
                <input
                    required
                    type="date"
                    name="birthdate"
                    id="birthdate"
                    placeholder="Birthdate"
                    autoComplete="off"
                    onChange={(e) => setFormValue("birthdate", e.target.value)}
                    value={formData.birthdate}
                />
                <input
                    required
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    autoComplete="off"
                    onChange={(e) => setFormValue("username", e.target.value)}
                    value={formData.username}
                />
                <input
                    required
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={(e) => setFormValue("password", e.target.value)}
                    value={formData.password}
                />
                <input
                    required
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    placeholder="Confirm password"
                    onChange={(e) =>
                        setFormValue("password_confirmation", e.target.value)
                    }
                    value={formData.password_confirmation}
                />
                <h3>Avatar</h3>
                <input required type="file" accept="image/png, image/jpg, image/jpeg" name="avatar" id="avatar" />
                <button>Register</button>

                {error ? <p>{error}</p> : null}
            </form>
        </div>
    );
};

export default Register;
