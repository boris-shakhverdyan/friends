export type PostType = {
    id: number;
    body: string;
    userId: number;
    reactions: Array<number>;
    created_at: number;
};

export type IncompletePostType = {
    body: string;
    userId: number;
};
