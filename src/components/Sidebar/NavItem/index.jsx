import { NavLink } from "react-router-dom";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavItem = ({ text, icon, path }) => {
    return (
        <NavLink className="nav-item" to={path}>
            <FontAwesomeIcon icon={icon} />
            <span>{text}</span>
        </NavLink>
    );
};

export default NavItem;
