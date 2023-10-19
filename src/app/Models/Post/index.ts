import PostAPI from "../../../api/PostAPI";
import { TIncompletePost, TPost } from "../../../types/PostType";
import User from "../User";
import PostDBStructure from "./PostDBStructure";

class Post {
    private _id: number;
    private _body: string;
    private _userId: number;
    private _reactions: Array<number>;
    private _created_at: number;

    constructor(post: TPost) {
        this._id = post.id;
        this._body = post.body;
        this._userId = post.userId;
        this._reactions = post.reactions;
        this._created_at = post.created_at;
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

    public async save(): Promise<Post> {
        let result = this.getDBStructure();

        await PostAPI.update(result);

        return this;
    }

    public getDBStructure(): PostDBStructure {
        return new PostDBStructure({
            id: this._id,
            body: this._body,
            userId: this._userId,
            reactions: this._reactions,
            created_at: this._created_at,
        });
    }

    public async delete(): Promise<boolean> {
        return await PostAPI.delete(this._id);
    }

    public async toggleLike(authUser: User): Promise<Post> {
        if (this._reactions.includes(authUser.id)) {
            this._reactions = this._reactions.filter((id) => id !== authUser.id);
        } else {
            this._reactions = [authUser.id, ...this._reactions];
        }

        this.save();

        return this;
    }

    public static make(post: TPost | null): Post | null {
        return post ? new Post(post) : null;
    }

    public static async create(postData: TIncompletePost): Promise<Post | null> {
        return this.make(
            await PostAPI.create({
                id: new Date().getTime(),
                body: postData.body,
                userId: postData.userId,
                reactions: [],
                created_at: new Date().getTime(),
            })
        );
    }

    public static async find(id: number): Promise<Post | null> {
        return this.make(await PostAPI.getById(id));
    }

    public static async all(): Promise<Post[] | null> {
        const posts = await PostAPI.get();

        if (!posts) {
            return null;
        }

        return posts.map((post) => new Post(post));
    }

    public static async getByUserId(userId: number | Array<number>): Promise<Post[] | null> {
        const posts = await PostAPI.get({ userId });

        if (!posts) {
            return null;
        }

        return posts.map((post) => new Post(post));
    }

    public static async search(query: string): Promise<Post[] | null> {
        const posts = await PostAPI.get({ q: query });

        if (!posts) {
            return null;
        }

        return posts.map((post) => new Post(post));
    }

    public static async getByIds(ids: Array<number>): Promise<Post[] | null> {
        const posts = await PostAPI.getByIds(ids);

        if (!posts) {
            return null;
        }

        return posts.map((post) => new Post(post));
    }

    public static async delete(postId: number): Promise<boolean> {
        return await PostAPI.delete(postId);
    }
}

export default Post;
