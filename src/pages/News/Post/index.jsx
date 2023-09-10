import { useEffect, useState } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMessage, faShare } from "@fortawesome/free-solid-svg-icons";

const Post = ({ id, title, body, userId, tags, reactions }) => {
    const [author, setAuthor] = useState(null);
    const [comments, setComments] = useState(null);

    useEffect(() => {
        fetch(`https://dummyjson.com/users/${userId}`)
            .then((res) => res.json())
            .then((data) => setAuthor(data));

        fetch(`https://dummyjson.com/comments/post/${id}`)
            .then((res) => res.json())
            .then((data) => setComments(data.comments));
    }, [id, userId]);

    if (!author || !comments) {
        return <div className="preloader"></div>;
    }

    return (
        <div className="post">
            <div className="header">
                <div className="author">
                    <img src={author.image} alt={author.image} />
                    <h4>{`${author.firstName} ${author.lastName} (${author.username})`}</h4>
                </div>
                <div className="tags">
                    {tags.map((tag, index) => (
                        <span key={index} className="tag">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="content">
                <h3>{title}</h3>
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
