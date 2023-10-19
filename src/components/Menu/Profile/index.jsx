import { useRef, useState } from "react";
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
import Auth from "../../../app/Services/Auth";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../../store/Slices/auth/selectors";
import { useDispatch } from "react-redux";
import { setAuthUserAC } from "../../../store/Slices/auth/actions";
import { showModalAC } from "../../../store/Slices/app/actions";

const Profile = () => {
    const profileRef = useRef(null);
    const [isOpened, setIsOpened] = useState(false);
    const authUser = useSelector(selectAuthUser);
    const dispatch = useDispatch();

    document.addEventListener("mousedown", (e) => {
        if (profileRef.current && isOpened && !profileRef.current.contains(e.target)) {
            setIsOpened(false);
        }
    });

    const logoutUser = (e) => {
        setIsOpened(false);
        Auth.logout();
        dispatch(setAuthUserAC(null));
    };

    const LogoutModal = (e) => {
        e.preventDefault();

        dispatch(
            showModalAC({
                title: "Do you want to logout?",
                onDanger: logoutUser,
                dangerContent: "Logout",
                onSuccess: () => {},
                successContent: "Stay",
            })
        );
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
            <div className={`avatar ${isOpened ? "active" : ""}`} onClick={() => setIsOpened(!isOpened)}>
                <img src={authUser.avatar} alt={authUser.fullName} />
                <FontAwesomeIcon icon={faChevronDown} />
            </div>
            <div className={`dropdown ${isOpened ? "opened" : ""}`}>
                <NavLink onClick={() => setIsOpened(false)} to={"/profile/" + authUser.id} className="avatar">
                    <img src={authUser.avatar} alt={authUser.fullName} />
                    <span>{authUser.fullName}</span>
                </NavLink>
                <div className="links">
                    {links.map((link, index) => (
                        <Link onClick={() => setIsOpened(false)} key={index} {...link} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
