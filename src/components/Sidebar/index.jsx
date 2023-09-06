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
import NavItem from "./NavItem";

const Sidebar = () => {
    const links = [
        { text: "Profile", path: "profile", icon: faUserCircle },
        { text: "News", path: "news", icon: faNewspaper },
        { text: "Messenger", path: "messenger", icon: faEnvelope },
        { text: "Friends", path: "friends", icon: faUserGroup },
        { text: "Groups", path: "groups", icon: faUsersRectangle },
        { text: "Photos", path: "photos", icon: faImage },
        { text: "Audios", path: "audios", icon: faHeadphones },
        { text: "Videos", path: "videos", icon: faVideo },
        { text: "Games", path: "games", icon: faChessKnight },
        { text: "Stickers", path: "stickers", icon: faFaceSmile },
        { text: "Market", path: "market", icon: faBasketShopping },
        { text: "Services", path: "services", icon: faMicrochip },
    ];

    return (
        <div className="sidebar">
            <div className="fixed">
                {links.map((route, index) => (
                    <NavItem key={index} {...route} />
                ))}
                <hr />
                <NavItem
                    text={"Bookmarks"}
                    path={"bookmarks"}
                    icon={faBookmark}
                />
                <NavItem text={"Files"} path={"files"} icon={faFile} />
                <NavItem text={"Ads"} path={"ads"} icon={faBullhorn} />
            </div>
        </div>
    );
};

export default Sidebar;
