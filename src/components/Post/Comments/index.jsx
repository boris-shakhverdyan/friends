import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useSendRequest } from "../../../hooks/useSendRequest";
import Comment from "./Comment";
import "./style.scss";

const Comments = ({ post, authUser, isWantToComment, setIsWantToComment }) => {
    const [comments, setComments] = useState(null);
    const [commentText, setCommentText] = useState("");
    const { get, put, post: postReq } = useSendRequest();

    useEffect(() => {
        (async () => {
            let comments = await get(
                `comments?postId=${post.id}&_sort=created_at`
            );

            const usersIds = new Set(comments.map((comment) => comment.userId));
            usersIds.delete(authUser.id);

            let users = [];

            if (usersIds.size) {
                const query = `users?${[...usersIds]
                    .map((id) => "id=" + id)
                    .join("&")}`;

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

    const addComment = async (e) => {
        e.preventDefault();

        if (commentText.trim()) {
            const newComment = {
                id: new Date().getTime(),
                body: commentText.trim(),
                postId: post.id,
                userId: authUser.id,
                created_at: new Date().getTime(),
                reactions: [],
            };

            await postReq(`comments`, newComment);

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
                    <img src={authUser.avatar} alt={authUser.avatar} />
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
