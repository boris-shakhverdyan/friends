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

const Profile = ({ avatar }) => {
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

    const links = [
        { href: "/settings", text: "Settings", icon: faGear },
        { href: "/theme", text: "Theme", icon: faPalette },
        { href: "/lang", text: "Language", icon: faGlobeAmericas },
        { href: "/help", text: "Help", icon: faQuestionCircle },
        { href: "/logout", text: "Quit", icon: faRightFromBracket },
    ];

    return (
        <div className="profile" ref={profileRef}>
            <div
                className={`avatar ${isOpened ? "active" : ""}`}
                onClick={() => setIsOpened(!isOpened)}
            >
                <img src={avatar} alt="avatar" />
                <FontAwesomeIcon icon={faChevronDown} />
            </div>
            <div className={`dropdown ${isOpened ? "opened" : ""}`}>
                <a href="/profile" className="avatar">
                    <img src={avatar} alt="avatar" />
                    <span>Boris Shakhverdyan</span>
                </a>
                <div className="links">
                    {links.map((link, index) => (
                        <Link key={index} {...link} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
