import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

const Notifications = () => {
    return (
        <div className="notifications">
            <FontAwesomeIcon icon={faBell} />
        </div>
    );
};

export default Notifications;
