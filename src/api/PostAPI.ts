import instance from "./instance";
import Query from "../app/Services/Query";
import { PostType } from "../types/PostType";

class PostAPI {
    public static async create(post: PostType): Promise<PostType | null> {
        try {
            await instance.post("posts", post);
        } catch (e) {
            console.log(e);
            console.error(`ERROR: PostAPI.create(${JSON.stringify(post)});`);

            return null;
        }

        return post;
    }

    public static async delete(postId: number): Promise<boolean> {
        try {
            await instance.delete(`posts/${postId}`);
        } catch (e) {
            console.log(e);
            console.error(`ERROR: PostAPI.delete(${postId}});`);

            return false;
        }

        return true;
    }

    public static async update(post: PostType): Promise<PostType | null> {
        try {
            await instance.put(`posts/${post.id}`, post);
        } catch (e) {
            console.log(e);
            console.error(`ERROR: PostAPI.update(${JSON.stringify(post)}});`);

            return null;
        }

        return post;
    }

    public static async get(filters: any = {}): Promise<PostType[] | null> {
        let posts: PostType[] | null = null;

        if (!filters?._sort) {
            filters._sort = "created_at";
        }

        if (!filters?._order) {
            filters._order = "desc";
        }

        try {
            posts = await instance
                .get(`posts${Query.parseToURI(filters)}`)
                .then((res) => res.data);
        } catch (e) {
            console.log(e);
            console.error(`ERROR: PostAPI.get(${JSON.stringify(filters)}});`);
        }

        return posts;
    }

    public static async getById(id: number): Promise<PostType | null> {
        let post: PostType | null = null;

        try {
            post = await instance
                .get(`posts${Query.parseToURI({ id })}`)
                .then((res) => res.data[0]);
        } catch (e) {
            console.log(e);
            console.error(`ERROR: PostAPI.getById(${id}});`);
        }

        return post;
    }

    public static async getByUserId(
        userId: number
    ): Promise<PostType[] | null> {
        let posts: PostType[] | null = null;

        try {
            posts = await instance
                .get(`posts${Query.parseToURI({ userId })}`)
                .then((res) => res.data);
        } catch (e) {
            console.log(e);
            console.error(`ERROR: PostAPI.getByUserId(${userId}});`);
        }

        return posts;
    }

    public static async getByIds(
        ids: Array<number>
    ): Promise<PostType[] | null> {
        return await this.get({ id: ids });
    }
}

export default PostAPI;
