import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";
import {
    faBasketShopping,
    faBookmark,
    faBullhorn,
    faChessKnight,
    faEnvelope,
    faFaceSmile,
    faFile,
    faHeadphones,
    faImage,
    faMicrochip,
    faNewspaper,
    faUserCircle,
    faUserGroup,
    faUsersRectangle,
    faVideo,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
    const links = [
        { text: "Profile", href: "/profile", icon: faUserCircle },
        { text: "News", href: "/news", icon: faNewspaper },
        { text: "Messenger", href: "/messenger", icon: faEnvelope },
        { text: "Friends", href: "/friends", icon: faUserGroup },
        { text: "Groups", href: "/groups", icon: faUsersRectangle },
        { text: "Photos", href: "/photos", icon: faImage },
        { text: "Audios", href: "/audios", icon: faHeadphones },
        { text: "Videos", href: "/videos", icon: faVideo },
        { text: "Games", href: "/games", icon: faChessKnight },
        { text: "Stickers", href: "/stickers", icon: faFaceSmile },
        { text: "Market", href: "/market", icon: faBasketShopping },
        { text: "Services", href: "/services", icon: faMicrochip },
    ];

    return (
        <div className="sidebar">
            <div className="fixed">
                {links.map(({ text, href, icon }, index) => (
                    <a key={index} className="nav-item" href={href}>
                        <FontAwesomeIcon icon={icon} />
                        <span>{text}</span>
                    </a>
                ))}
                <hr />
                <a className="nav-item" href="/bookmarks">
                    <FontAwesomeIcon icon={faBookmark} />
                    <span>Bookmarks</span>
                </a>
                <a className="nav-item" href="/files">
                    <FontAwesomeIcon icon={faFile} />
                    <span>Files</span>
                </a>
                <a className="nav-item" href="/ads">
                    <FontAwesomeIcon icon={faBullhorn} />
                    <span>Ads</span>
                </a>
            </div>
        </div>
    );
};

export default Sidebar;
