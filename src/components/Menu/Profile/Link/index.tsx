import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./style.module.scss";
import { Link as NavLink } from "react-router-dom";
import { TLinkProps } from "./types";

const Link = ({ icon, text, href, onClick = undefined }: TLinkProps) => {
    return (
        <NavLink to={href} className={styles.link} onClick={onClick}>
            <FontAwesomeIcon icon={icon} />
            <span>{text}</span>
        </NavLink>
    );
};

export default Link;
