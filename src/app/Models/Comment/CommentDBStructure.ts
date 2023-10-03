import { CommentType } from "../../../types/CommentType";

class CommentDBStructure {
    public id: number;
    public body: string;
    public postId: number;
    public userId: number;
    public reactions: Array<number>;
    public created_at: number;

    constructor(post: CommentType) {
        this.id = post.id;
        this.body = post.body;
        this.postId = post.postId;
        this.userId = post.userId;
        this.reactions = post.reactions;
        this.created_at = post.created_at;
    }
}

export default CommentDBStructure;
