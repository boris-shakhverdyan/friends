import { NavLink } from "react-router-dom";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TNavItemProps } from "./types";

const NavItem = ({ text, icon, path }: TNavItemProps) => {
    return (
        <NavLink className="nav-item" to={path}>
            <FontAwesomeIcon icon={icon} />
            <span>{text}</span>
        </NavLink>
    );
};

export default NavItem;
