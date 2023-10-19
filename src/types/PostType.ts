export type TPost = {
    id: number;
    body: string;
    userId: number;
    reactions: Array<number>;
    created_at: number;
};

export type TIncompletePost = {
    body: string;
    userId: number;
};
