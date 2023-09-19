import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faGear,
    faGlobeAmericas,
    faPalette,
    faQuestionCircle,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import { useRef, useState } from "react";
import Link from "./Link";
import { Link as NavLink } from "react-router-dom";

const Profile = ({ authUser, setAuthUser }) => {
    const profileRef = useRef(null);
    const [isOpened, setIsOpened] = useState(false);

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
        e.preventDefault();
        setIsOpened(false);
        setAuthUser(null);
    };

    const links = [
        { href: "settings", text: "Правки", icon: faGear },
        { href: "theme", text: "Тема", icon: faPalette },
        { href: "lang", text: "Язык", icon: faGlobeAmericas },
        { href: "help", text: "Справочная", icon: faQuestionCircle },
        {
            href: "logout",
            text: "Эмигрировать",
            icon: faRightFromBracket,
            onClick: logoutUser,
        },
    ];

    return (
        <div className="profile" ref={profileRef}>
            <div
                className={`avatar ${isOpened ? "active" : ""}`}
                onClick={() => setIsOpened(!isOpened)}
            >
                <img src={authUser.avatar} alt="avatar" />
                <FontAwesomeIcon icon={faChevronDown} />
            </div>
            <div className={`dropdown ${isOpened ? "opened" : ""}`}>
                <NavLink
                    onClick={() => setIsOpened(false)}
                    to={"profile"}
                    className="avatar"
                >
                    <img src={authUser.avatar} alt="avatar" />
                    <span>{authUser.firstName + " " + authUser.lastName}</span>
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
