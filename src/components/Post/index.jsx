import { useEffect, useState } from "react";
import moment from "moment/moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsis,
    faHeart,
    faMessage,
    faShare,
} from "@fortawesome/free-solid-svg-icons";
import { useSendRequest } from "../../hooks/useSendRequest";
import Comments from "./Comments";
import "./style.scss";

const Post = ({ setPosts, post, authUser }) => {
    const [author, setAuthor] = useState(null);
    const [comments, setComments] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isWantToComment, setIsWantToComment] = useState(false);
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
            let comments = await get(
                `comments?postId=${post.id}&_sort=created_at`
            );

            const usersIds = new Set(comments.map((comment) => comment.userId));
            usersIds.delete(authUser.id);

            let users = [];

            if (usersIds.size) {
                const query = `users?id=${[...usersIds].join(",")}`;

                users = await get(query);
            }

            setComments(
                comments.map((comment) => {
                    if (comment.userId === authUser.id) {
                        comment.user = authUser;
                    } else {
                        comment.user = users.find(
                            (user) => comment.userId === user.id
                        );
                    }

                    return comment;
                })
            );
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
