import { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHeart } from "@fortawesome/free-solid-svg-icons";
import commentAPI from "../../../../api/commentAPI";
import "./style.scss";

const Comment = ({
    comment,
    authUser,
    setComments,
    setIsWantToComment,
    setCommentText,
}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const deleteComment = async () => {
        await commentAPI.delete(comment.id);

        setComments((comments) =>
            comments.filter((item) => item.id !== comment.id)
        );
    };

    const toggleLike = async (comment) => {
        const reactions = await commentAPI.toggleLike(authUser, comment);

        setComments((comments) =>
            comments.filter((item) => {
                if (item.id === comment.id) {
                    item.reactions = reactions;
                }

                return item;
            })
        );
    };

    return (
        <div className="comment">
            <img
                src={"/assets/avatars/" + comment.user.avatar}
                alt={comment.user.firstName + " " + comment.user.lastName}
            />
            <div>
                <div className="header">
                    <Link className="link" to={`/profile/${comment.user.id}`}>
                        {comment.user.firstName + " " + comment.user.lastName}
                    </Link>
                    {authUser?.id === comment.user.id && (
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
                                    <li
                                        className="delete"
                                        onClick={deleteComment}
                                    >
                                        Delete
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                <p>{comment.body}</p>
                <div className="actions">
                    <div>
                        <span className="dateTime">
                            {moment(comment.created_at).fromNow()}
                        </span>
                        <span
                            className="link-small"
                            onClick={() => {
                                setIsWantToComment(true);
                                setCommentText(`${comment.user.firstName}, `);
                            }}
                        >
                            Ответить
                        </span>
                    </div>
                    <button
                        className={
                            comment.reactions.includes(authUser.id)
                                ? "liked"
                                : ""
                        }
                        onClick={() => toggleLike(comment)}
                    >
                        <FontAwesomeIcon icon={faHeart} />
                        <span>{comment.reactions.length}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Comment;
