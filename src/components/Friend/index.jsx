import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import userAPI from "../../api/userAPI";
import "./style.scss";

const Friend = ({ friend, setFriends, authUser }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const deleteFriend = async () => {
        await userAPI.deleteFriend(authUser, friend);

        setFriends((friends) =>
            friends.filter((user) => user.id !== friend.id)
        );
    };

    return (
        <div className="friend">
            <img src={friend.getAvatarPath()} alt={friend.fullName} />
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
