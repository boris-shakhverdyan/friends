import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./style.module.scss";

const Link = ({ icon, text, href }) => {
    return (
        <a href={href} className={styles.link}>
            <FontAwesomeIcon icon={icon} />
            <span>{text}</span>
        </a>
    );
};

export default Link;
