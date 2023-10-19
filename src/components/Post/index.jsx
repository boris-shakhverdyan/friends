import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsis,
    faHeart,
    faMessage,
    faShare,
} from "@fortawesome/free-solid-svg-icons";
import Comments from "./Comments";
import AppContext from "../../contexts/AppContext";
import User from "../../app/Models/User";
import "./style.scss";
import { CHANGE_MODAL_STATUS } from "../../App";

const Post = ({ setPosts, post }) => {
    const [author, setAuthor] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isWantToComment, setIsWantToComment] = useState(false);
    const {
        state: { authUser },
        dispatch,
    } = useContext(AppContext);

    useEffect(() => {
        (async () => {
            if (authUser.id !== post.userId) {
                setAuthor(await User.find(post.userId));
            } else {
                setAuthor(authUser);
            }
        })();
    }, [post.id, post.userId]);

    if (!author) {
        return <div className="preloader"></div>;
    }

    const toggleLike = async () => {
        const reactions = (await post.toggleLike(authUser)).reactions;

        setPosts((posts) =>
            posts.filter((item) => {
                if (item.id === post.id) {
                    item.reactions = reactions;
                }

                return item;
            })
        );
    };

    const deletePost = async () => {
        await post.delete();

        setPosts((posts) => posts.filter((item) => item.id !== post.id));
    };

    const deletePostModal = () => {
        dispatch({
            type: CHANGE_MODAL_STATUS,
            payload: {
                isActive: true,
                title: "Do you want to remove post?",
                body: "The post will be deleted permanently.",
                onDanger: deletePost,
            },
        });
    };

    return (
        <div className="post">
            <div className="header">
                <div className="author">
                    <div className="left">
                        <img src={author.avatar} alt={author.fullName} />
                        <Link className="link" to={`/profile/${author.id}`}>
                            {author.fullNameWithUsername}
                        </Link>
                        <span className="datetime">
                            {moment(post.created_at).fromNow()}
                        </span>
                    </div>
                    {authUser?.id === post.userId && (
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
                                        onClick={deletePostModal}
                                    >
                                        Delete
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="content">
                <p>{post.body}</p>
            </div>
            <div className="actions">
                <button
                    className={
                        post.reactions.includes(authUser.id) ? "liked" : ""
                    }
                    onClick={() => toggleLike(post)}
                >
                    <FontAwesomeIcon icon={faHeart} />
                    <span>{post.reactions.length}</span>
                </button>
                <button onClick={() => setIsWantToComment(!isWantToComment)}>
                    <FontAwesomeIcon icon={faMessage} />
                    <span>{0}</span>
                </button>
                <button>
                    <FontAwesomeIcon icon={faShare} />
                    <span>{0}</span>
                </button>
            </div>
            <Comments
                post={post}
                authUser={authUser}
                isWantToComment={isWantToComment}
                setIsWantToComment={setIsWantToComment}
            />
        </div>
    );
};

export default Post;
