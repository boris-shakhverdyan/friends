import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./style.module.scss";
import { Link as NavLink } from "react-router-dom";

const Link = ({ icon, text, href, onClick = null }) => {
    return (
        <NavLink to={href} className={styles.link} onClick={onClick}>
            <FontAwesomeIcon icon={icon} />
            <span>{text}</span>
        </NavLink>
    );
};

export default Link;
