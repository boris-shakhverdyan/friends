import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { selectAuthUser } from "../../store/Slices/auth/selectors";
import "./style.scss";
import { useDispatch } from "react-redux";
import { showModalAC } from "../../store/Slices/app/actions";

const Friend = ({ friend, setFriends }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const authUser = useSelector(selectAuthUser);
    const dispatch = useDispatch();

    const deleteFriend = async () => {
        await authUser.deleteFriend(friend);

        setFriends((friends) => friends.filter((user) => user.id !== friend.id));
    };

    const deleteFriendModal = () => {
        dispatch(
            showModalAC({
                title: "Do you want to Unfriend him?",
                onDanger: deleteFriend,
                dangerContent: "Unfriend",
            })
        );
    };

    return (
        <div className="friend">
            <div className="friend__avatar">
                <img src={friend.avatar} alt={friend.fullName} />
                {friend.isOnline && <span className="friend__online"></span>}
            </div>
            <div className="info">
                <div className="header">
                    <Link to={`/profile/${friend.id}`}>{friend.fullNameWithUsername}</Link>
                    <div
                        className="right"
                        onMouseEnter={() => setIsPopupOpen(true)}
                        onMouseLeave={() => setIsPopupOpen(false)}
                    >
                        <FontAwesomeIcon icon={faEllipsis} />
                        <div className={`popup ${!isPopupOpen ? "closed" : "opened"}`}>
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
