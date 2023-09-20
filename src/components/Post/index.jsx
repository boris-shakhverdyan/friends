import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsis,
    faHeart,
    faMessage,
    faShare,
} from "@fortawesome/free-solid-svg-icons";
import { useSendRequest } from "../../hooks/useSendRequest";
import moment from "moment/moment";
import "./style.scss";

const Post = ({ setPosts, post, authUser }) => {
    const [author, setAuthor] = useState(null);
    const [comments, setComments] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { get, put, del } = useSendRequest();

    useEffect(() => {
        if (authUser?.id !== post.userId) {
            (async () => {
                const author = await get(`users/${post.userId}`);
                setAuthor(author);
            })();
        } else {
            setAuthor(authUser);
        }

        (async () => {
            setComments(await get(`comments?postId=${post.id}`));
        })();
    }, [post.id, post.userId]);

    if (!author || !comments) {
        return <div className="preloader"></div>;
    }

    const toggleLike = async () => {
        let reactions = [];

        if (post.reactions.includes(authUser.id)) {
            reactions = post.reactions.filter(
                (reaction) => reaction !== authUser.id
            );
        } else {
            reactions = [authUser.id, ...post.reactions];
        }

        await put(`posts/${post.id}`, { ...post, reactions });

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
        await del(`posts/${post.id}`);

        setPosts((posts) => posts.filter((item) => item.id !== post.id));
    };

    return (
        <div className="post">
            <div className="header">
                <div className="author">
                    <div className="left">
                        <img src={author.avatar} alt={author.avatar} />
                        <h4>{`${author.firstName} ${author.lastName} (${author.username})`}</h4>
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
                <button>
                    <FontAwesomeIcon icon={faMessage} />
                    <span>{0}</span>
                </button>
                <button>
                    <FontAwesomeIcon icon={faShare} />
                    <span>{0}</span>
                </button>
            </div>
            <div className="comments">
                {comments && comments.length ? (
                    comments.map((comment) => (
                        <div key={comment.id} className="comment">
                            <p>{comment.body}</p>
                            <p className="link">{comment.user.username}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-comments">No comments</p>
                )}
            </div>
        </div>
    );
};

export default Post;
