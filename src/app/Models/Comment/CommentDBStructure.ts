import { TComment, TCommentData } from "../../../types/CommentType";

class CommentDBStructure {
    public id: number;
    public body: string;
    public postId: number;
    public userId: number;
    public reactions: number[];
    public created_at: number;

    constructor(comment: TCommentData | TComment) {
        this.id = comment.id;
        this.body = comment.body;
        this.postId = comment.postId;
        this.userId = comment.userId;
        this.reactions = comment.reactions;
        this.created_at = comment.created_at;
    }
}

export default CommentDBStructure;
