import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import commentAPI from "../../../api/commentAPI";
import Comment from "./Comment";
import "./style.scss";

const Comments = ({ post, authUser, isWantToComment, setIsWantToComment }) => {
    const [comments, setComments] = useState(null);
    const [commentText, setCommentText] = useState("");

    useEffect(() => {
        (async () => {
            const comments = await commentAPI.getByPostId(post.id);

            setComments(comments);
        })();
    }, [post.id, post.userId]);

    const addComment = async (e) => {
        e.preventDefault();

        if (commentText.trim()) {
            const newComment = await commentAPI.create(
                authUser.id,
                post.id,
                commentText.trim()
            );

            newComment.user = authUser;

            setComments([...comments, newComment]);
        }

        e.target.reset();
        setCommentText("");
    };

    return (
        <>
            {comments && comments.length ? (
                <div className="comments">
                    {comments.map((comment) => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            authUser={authUser}
                            setComments={setComments}
                            setIsWantToComment={setIsWantToComment}
                            setCommentText={setCommentText}
                        />
                    ))}
                </div>
            ) : null}
            {isWantToComment && (
                <form onSubmit={addComment} className="addComment">
                    <img
                        src={"/assets/avatars/" + authUser.avatar}
                        alt={authUser.firstName + " " + authUser.lastName}
                    />
                    <input
                        type="text"
                        name="newComment"
                        autoComplete="off"
                        placeholder="Write a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        autoFocus
                    />
                    <button type="submit">
                        <FontAwesomeIcon
                            className="commentSentIcon"
                            icon={faPaperPlane}
                        />
                    </button>
                </form>
            )}
        </>
    );
};

export default Comments;
