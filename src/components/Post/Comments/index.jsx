import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import CommentComponent from "./Comment";
import Comment from "../../../app/Models/Comment";
import { selectAuthUser } from "../../../store/Slices/auth/selectors";
import "./style.scss";

const Comments = ({ post, isWantToComment, setIsWantToComment }) => {
    const [comments, setComments] = useState(null);
    const [commentText, setCommentText] = useState("");
    const authUser = useSelector(selectAuthUser);

    useEffect(() => {
        (async () => {
            const comments = await Comment.getByPostId(post.id);

            setComments(comments);
        })();
    }, [post.id, post.userId]);

    const addComment = async (e) => {
        e.preventDefault();
        const body = commentText.trim();

        if (body) {
            const newComment = await Comment.create({
                userId: authUser.id,
                postId: post.id,
                body,
            });

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
                        <CommentComponent
                            key={comment.id}
                            comment={comment}
                            setComments={setComments}
                            setIsWantToComment={setIsWantToComment}
                            setCommentText={setCommentText}
                        />
                    ))}
                </div>
            ) : null}
            {isWantToComment && (
                <form onSubmit={addComment} className="addComment">
                    <img src={authUser.avatar} alt={authUser.fullName} />
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
                        <FontAwesomeIcon className="commentSentIcon" icon={faPaperPlane} />
                    </button>
                </form>
            )}
        </>
    );
};

export default Comments;
