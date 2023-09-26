import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsis,
    faHeart,
    faMessage,
    faShare,
} from "@fortawesome/free-solid-svg-icons";
import postAPI from "../../api/postAPI";
import userAPI from "../../api/userAPI";
import Comments from "./Comments";
import "./style.scss";

const Post = ({ setPosts, post, authUser }) => {
    const [author, setAuthor] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isWantToComment, setIsWantToComment] = useState(false);

    useEffect(() => {
        (async () => {
            if (authUser?.id !== post.userId) {
                setAuthor(await userAPI.getById(post.userId));
            } else {
                setAuthor(authUser);
            }
        })();
    }, [post.id, post.userId]);

    if (!author) {
        return <div className="preloader"></div>;
    }

    const toggleLike = async () => {
        const reactions = await postAPI.toggleLike(authUser, post);

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
        postAPI.delete(post.id);

        setPosts((posts) => posts.filter((item) => item.id !== post.id));
    };

    return (
        <div className="post">
            <div className="header">
                <div className="author">
                    <div className="left">
                        <img
                            src={"/assets/avatars/" + author.avatar}
                            alt={author.firstName + " " + author.lastName}
                        />
                        <Link
                            className="link"
                            to={`/profile/${author.id}`}
                        >{`${author.firstName} ${author.lastName} (${author.username})`}</Link>
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
                                    <li className="delete" onClick={deletePost}>
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
