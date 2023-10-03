import { useContext, useRef, useState } from "react";
import { Link as NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faGear,
    faGlobeAmericas,
    faPalette,
    faQuestionCircle,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Link from "./Link";
import "./style.scss";
import AppContext from "../../../contexts/AppContext";
import { CHANGE_MODAL_STATUS, SET_AUTH_USER } from "../../../App";
import Auth from "../../../app/Services/Auth";

const Profile = () => {
    const profileRef = useRef(null);
    const [isOpened, setIsOpened] = useState(false);
    const {
        state: { authUser },
        dispatch,
    } = useContext(AppContext);

    document.addEventListener("mousedown", (e) => {
        if (
            profileRef.current &&
            isOpened &&
            !profileRef.current.contains(e.target)
        ) {
            setIsOpened(false);
        }
    });

    const logoutUser = (e) => {
        setIsOpened(false);
        Auth.logout();
        dispatch({ type: SET_AUTH_USER, payload: null });
    };

    const LogoutModal = (e) => {
        e.preventDefault();

        dispatch({
            type: CHANGE_MODAL_STATUS,
            payload: {
                isActive: true,
                title: "Do you want to logout?",
                onDanger: logoutUser,
                dangerContent: "Logout",
                onSuccess: () => {},
                successContent: "Stay",
            },
        });
    };

    const links = [
        { href: "settings", text: "Settings", icon: faGear },
        { href: "theme", text: "Theme", icon: faPalette },
        { href: "lang", text: "Language", icon: faGlobeAmericas },
        { href: "help", text: "Help", icon: faQuestionCircle },
        {
            href: "logout",
            text: "Logout",
            icon: faRightFromBracket,
            onClick: LogoutModal,
        },
    ];

    return (
        <div className="profile" ref={profileRef}>
            <div
                className={`avatar ${isOpened ? "active" : ""}`}
                onClick={() => setIsOpened(!isOpened)}
            >
                <img src={authUser.avatar} alt={authUser.fullName} />
                <FontAwesomeIcon icon={faChevronDown} />
            </div>
            <div className={`dropdown ${isOpened ? "opened" : ""}`}>
                <NavLink
                    onClick={() => setIsOpened(false)}
                    to={"/profile/" + authUser.id}
                    className="avatar"
                >
                    <img src={authUser.avatar} alt={authUser.fullName} />
                    <span>{authUser.fullName}</span>
                </NavLink>
                <div className="links">
                    {links.map((link, index) => (
                        <Link
                            onClick={() => setIsOpened(false)}
                            key={index}
                            {...link}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
