import { UserType } from "./UserType";

export type CommentType = {
    id: number;
    body: string;
    postId: number;
    userId: number;
    reactions: Array<number>;
    created_at: number;
    user?: UserType;
};

export type IncompleteCommentType = {
    body: string;
    postId: number;
    userId: number;
};
