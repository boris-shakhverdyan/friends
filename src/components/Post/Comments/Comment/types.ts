import Comment from "../../../../app/Models/Comment";

export type TCommentProps = {
    comment: Comment;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    setIsWantToComment: React.Dispatch<React.SetStateAction<boolean>>;
    setCommentText: React.Dispatch<React.SetStateAction<string>>;
};
