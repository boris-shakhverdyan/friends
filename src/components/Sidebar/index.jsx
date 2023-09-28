import "./style.scss";
import {
    faArchive,
    faBasketShopping,
    faBookmark,
    faBullhorn,
    faEnvelope,
    faIdCard,
    faNewspaper,
    faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import NavItem from "./NavItem";

const Sidebar = ({ authUser }) => {
    const links = [
        { text: "Profile", path: "profile/" + authUser.id, icon: faIdCard },
        { text: "News", path: "/", icon: faNewspaper },
        { text: "Messenger", path: "messenger", icon: faEnvelope },
        { text: "Friends", path: "friends", icon: faUserGroup },
        { text: "Shop", path: "shop", icon: faBasketShopping },
    ];

    return (
        <div className="sidebar">
            <div className="fixed">
                {links.map((route, index) => (
                    <NavItem key={index} {...route} />
                ))}
                <hr />
                <NavItem
                    text={"Коллекции"}
                    path={"bookmarks"}
                    icon={faBookmark}
                />
                <NavItem text={"Архив"} path={"files"} icon={faArchive} />
                <NavItem text={"Агитация"} path={"ads"} icon={faBullhorn} />
            </div>
        </div>
    );
};

export default Sidebar;
