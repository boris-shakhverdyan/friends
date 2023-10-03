import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHeart } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import AppContext from "../../../../contexts/AppContext";
import { CHANGE_MODAL_STATUS } from "../../../../App";

const Comment = ({
    comment,
    setComments,
    setIsWantToComment,
    setCommentText,
}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const {
        state: { authUser },
        dispatch,
    } = useContext(AppContext);

    const deleteComment = async () => {
        await comment.delete();

        setComments((comments) =>
            comments.filter((item) => item.id !== comment.id)
        );
    };

    const deleteCommentModal = () => {
        dispatch({
            type: CHANGE_MODAL_STATUS,
            payload: {
                isActive: true,
                title: "Do you want to remove your comment?",
                body: "Comment will be deleted permanently.",
                onDanger: deleteComment,
                dangerContent: "Delete",
            },
        });
    };

    const toggleLike = async () => {
        const reactions = (await comment.toggleLike(authUser)).reactions;

        setComments((comments) =>
            comments.map((item) => {
                if (item.id === comment.id) {
                    item.reactions = reactions;
                }

                return item;
            })
        );
    };

    return (
        <div className="comment">
            <img src={comment.user.avatar} alt={comment.user.fullName} />
            <div>
                <div className="header">
                    <Link className="link" to={`/profile/${comment.user.id}`}>
                        {comment.user.fullName}
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
                                        onClick={deleteCommentModal}
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
                        onClick={toggleLike}
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
