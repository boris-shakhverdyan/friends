import "./style.scss";
import {
    faArchive,
    faBasketShopping,
    faBookmark,
    faBullhorn,
    faCircleNodes,
    faDice,
    faEnvelope,
    faIdCard,
    faImages,
    faNewspaper,
    faRadio,
    faStamp,
    faTaxi,
    faTv,
    faUserGroup,
    faUsersRectangle,
} from "@fortawesome/free-solid-svg-icons";
import NavItem from "./NavItem";

const Sidebar = () => {
    const links = [
        { text: "Моё досье", path: "profile", icon: faIdCard },
        { text: "Газета", path: "news", icon: faNewspaper },
        { text: "Письма", path: "messenger", icon: faEnvelope },
        { text: "Связи", path: "calls", icon: faCircleNodes },
        { text: "Товарищи", path: "friends", icon: faUserGroup },
        { text: "Группировки", path: "groups", icon: faUsersRectangle },
        { text: "Альбомы", path: "photos", icon: faImages },
        { text: "Магнитофон", path: "audios", icon: faRadio },
        { text: "Телевидение", path: "videos", icon: faTv },
        { text: "Потехи", path: "games", icon: faDice },
        { text: "Печати", path: "stickers", icon: faStamp },
        { text: "Ярмарка", path: "shop", icon: faBasketShopping },
        { text: "Услуги", path: "services", icon: faTaxi },
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
