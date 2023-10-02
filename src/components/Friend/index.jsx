import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import userAPI from "../../api1/userAPI";
import "./style.scss";
import AppContext from "../../contexts/AppContext";

const Friend = ({ friend, setFriends }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const {
        state: { authUser },
    } = useContext(AppContext);

    const deleteFriend = async () => {
        await userAPI.deleteFriend(authUser, friend);

        setFriends((friends) =>
            friends.filter((user) => user.id !== friend.id)
        );
    };

    return (
        <div className="friend">
            <div className="friend__avatar">
                <img src={friend.getAvatarPath()} alt={friend.fullName} />
                {friend.isOnline && <span className="friend__online"></span>}
            </div>
            <div className="info">
                <div className="header">
                    <Link to={`/profile/${friend.id}`}>
                        {friend.getFullNameWithUsername()}
                    </Link>
                    <div
                        className="right"
                        onMouseEnter={() => setIsPopupOpen(true)}
                        onMouseLeave={() => setIsPopupOpen(false)}
                    >
                        <FontAwesomeIcon icon={faEllipsis} />
                        <div
                            className={`popup ${
                                !isPopupOpen ? "closed" : "opened"
                            }`}
                        >
                            <ul className="actions">
                                <li className="delete" onClick={deleteFriend}>
                                    Unfriend
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <p className="actions">
                    <Link to={`/messages/${friend.id}`} className="action">
                        Send message
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Friend;
