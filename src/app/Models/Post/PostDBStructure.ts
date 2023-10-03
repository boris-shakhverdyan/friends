import { PostType } from "../../../types/PostType";

class PostDBStructure {
    public id: number;
    public body: string;
    public userId: number;
    public reactions: Array<number>;
    public created_at: number;

    constructor(post: PostType) {
        this.id = post.id;
        this.body = post.body;
        this.userId = post.userId;
        this.reactions = post.reactions;
        this.created_at = post.created_at;
    }
}

export default PostDBStructure;
