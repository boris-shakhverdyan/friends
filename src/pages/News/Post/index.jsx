import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMessage, faShare } from "@fortawesome/free-solid-svg-icons";
import { useSendRequest } from "../../../hooks/useSendRequest";
import "./style.scss";
import moment from "moment/moment";

const Post = ({ id, body, userId, reactions, created_at, authUser = null }) => {
    const [author, setAuthor] = useState(null);
    const [comments, setComments] = useState(null);
    const { get } = useSendRequest();

    useEffect(() => {
        if (authUser?.id !== userId) {
            (async () => {
                const author = await get(`users/${userId}`);
                setAuthor(author);
            })();
        } else {
            setAuthor(authUser);
        }

        (async () => {
            setComments(await get(`comments?postId=${id}`));
        })();
    }, [id, userId]);

    if (!author || !comments) {
        return <div className="preloader"></div>;
    }

    return (
        <div className="post">
            <div className="header">
                <div className="author">
                    <img src={author.avatar} alt={author.avatar} />
                    <h4>{`${author.firstName} ${author.lastName} (${author.username})`}</h4>
                    <span className="datetime">{moment(created_at).fromNow()}</span>
                </div>
            </div>
            <div className="content">
                <p>{body}</p>
            </div>
            <div className="actions">
                <button>
                    <FontAwesomeIcon icon={faHeart} />
                    <span>{reactions}</span>
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
