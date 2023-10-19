import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import AppContext from "../../contexts/AppContext";
import "./style.scss";
import { CHANGE_MODAL_STATUS } from "../../App";

const Friend = ({ friend, setFriends }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const {
        state: { authUser },
        dispatch,
    } = useContext(AppContext);

    const deleteFriend = async () => {
        await authUser.deleteFriend(friend);

        setFriends((friends) =>
            friends.filter((user) => user.id !== friend.id)
        );
    };

    const deleteFriendModal = () => {
        dispatch({
            type: CHANGE_MODAL_STATUS,
            payload: {
                isActive: true,
                title: "Do you want to Unfriend him?",
                body: null,
                onDanger: deleteFriend,
                dangerContent: "Unfriend",
            },
        });
    };

    return (
        <div className="friend">
            <div className="friend__avatar">
                <img src={friend.avatar} alt={friend.fullName} />
                {friend.isOnline && <span className="friend__online"></span>}
            </div>
            <div className="info">
                <div className="header">
                    <Link to={`/profile/${friend.id}`}>
                        {friend.fullNameWithUsername}
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
                                <li className="delete" onClick={deleteFriendModal}>
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
