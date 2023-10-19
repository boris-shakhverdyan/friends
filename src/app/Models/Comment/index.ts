import CommentAPI from "../../../api/CommentAPI";
import { TComment, TIncompleteComment } from "../../../types/CommentType";
import { TUser } from "../../../types/UserType";
import User from "../User";
import CommentDBStructure from "./CommentDBStructure";

class Comment {
    private _id: number;
    private _body: string;
    private _postId: number;
    private _userId: number;
    private _reactions: Array<number>;
    private _created_at: number;
    private _user: TUser;

    constructor(comment: TComment) {
        this._id = comment.id;
        this._body = comment.body;
        this._postId = comment.postId;
        this._userId = comment.userId;
        this._reactions = comment.reactions;
        this._created_at = comment.created_at;
        this._user = comment.user;
    }

    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get body(): string {
        return this._body;
    }

    public set body(value: string) {
        this._body = value;
    }

    public get postId(): number {
        return this._postId;
    }

    public set postId(value: number) {
        this._postId = value;
    }

    public get userId(): number {
        return this._userId;
    }

    public set userId(value: number) {
        this._userId = value;
    }

    public get reactions(): Array<number> {
        return this._reactions;
    }

    public set reactions(value: Array<number>) {
        this._reactions = value;
    }

    public get created_at(): number {
        return this._created_at;
    }

    public set created_at(value: number) {
        this._created_at = value;
    }

    public get user(): User {
        return new User(this._user);
    }

    public set user(value: TUser | User) {
        if (value instanceof User) {
            this._user = value.getDBStructure();
        } else {
            this._user = value;
        }
    }

    public async save(): Promise<Comment> {
        let result = this.getDBStructure();

        await CommentAPI.update(result);

        return this;
    }

    public getDBStructure(): CommentDBStructure {
        return new CommentDBStructure({
            id: this._id,
            body: this._body,
            postId: this._postId,
            userId: this._userId,
            reactions: this._reactions,
            created_at: this._created_at,
        });
    }

    public async delete(): Promise<boolean> {
        return await CommentAPI.delete(this._id);
    }

    public async toggleLike(authUser: User): Promise<Comment> {
        if (this._reactions.includes(authUser.id)) {
            this._reactions = this._reactions.filter((id) => id !== authUser.id);
        } else {
            this._reactions = [authUser.id, ...this._reactions];
        }

        this.save();

        return this;
    }

    public static make(comment: TComment | null): Comment | null {
        return comment ? new Comment(comment) : null;
    }

    public static async create(commentData: TIncompleteComment): Promise<Comment | null> {
        return this.make(
            await CommentAPI.create({
                id: new Date().getTime(),
                body: commentData.body,
                postId: commentData.postId,
                userId: commentData.userId,
                reactions: [],
                created_at: new Date().getTime(),
            })
        );
    }

    public static async find(id: number): Promise<Comment | null> {
        return this.make(await CommentAPI.getById(id));
    }

    public static async all(): Promise<Comment[] | null> {
        const comments = await CommentAPI.get();

        if (!comments) {
            return null;
        }

        return comments.map((comment) => new Comment(comment));
    }

    public static async getByPostId(postId: number): Promise<Comment[] | null> {
        const comments = await CommentAPI.getByPostId(postId);

        if (!comments) {
            return null;
        }

        return comments.map((comment) => new Comment(comment));
    }

    public static async search(query: string): Promise<Comment[] | null> {
        const comments = await CommentAPI.get({ q: query });

        if (!comments) {
            return null;
        }

        return comments.map((comment) => new Comment(comment));
    }

    public static async delete(commentId: number): Promise<boolean> {
        return await CommentAPI.delete(commentId);
    }
}
export default Comment;
