import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useSendRequest } from "../../hooks/useSendRequest";
import "./style.scss";

const Friend = ({ friend, setFriends, authUser }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { put } = useSendRequest();

    const deleteFriend = async () => {
        await put(`users/${friend.id}`, {
            ...friend,
            friends: friend.friends.filter((friend) => friend !== authUser.id),
        });

        const newFriendsIds = authUser.friends.filter((id) => id !== friend.id);

        await put(`users/${authUser.id}`, {
            ...authUser,
            friends: newFriendsIds,
        });

        authUser.friends = newFriendsIds;

        setFriends((friends => friends.filter(user => user.id !== friend.id)));
    };

    return (
        <div className="friend">
            <img
                src={"/assets/avatars/" + friend.avatar}
                alt={friend.firstName + " " + friend.lastName}
            />
            <div className="info">
                <div className="header">
                    <Link
                        to={`/profile/${friend.id}`}
                    >{`${friend.firstName} ${friend.lastName} (${friend.username})`}</Link>
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
