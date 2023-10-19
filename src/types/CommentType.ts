import { TUser } from "./UserType";

export type TCommentData = {
    id: number;
    body: string;
    postId: number;
    userId: number;
    reactions: number[];
    created_at: number;
};

export type TComment = TCommentData & {
    user: TUser;
};

export type TIncompleteComment = {
    body: string;
    postId: number;
    userId: number;
};
