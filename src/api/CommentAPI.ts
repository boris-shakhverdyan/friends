import instance from "./instance";
import Query from "../app/Services/Query";
import { CommentType } from "../types/CommentType";

class CommentAPI {
    public static async create(
        comment: CommentType
    ): Promise<CommentType | null> {
        try {
            await instance.post("comments", comment);
        } catch (e) {
            console.log(e);
            console.error(
                `ERROR: CommentAPI.create(${JSON.stringify(comment)});`
            );

            return null;
        }

        return comment;
    }

    public static async delete(commentId: number): Promise<boolean> {
        try {
            await instance.delete(`comments/${commentId}`);
        } catch (e) {
            console.log(e);
            console.error(`ERROR: CommentAPI.delete(${commentId}});`);

            return false;
        }

        return true;
    }

    public static async update(
        comment: CommentType
    ): Promise<CommentType | null> {
        try {
            await instance.put(`comments/${comment.id}`, comment);
        } catch (e) {
            console.log(e);
            console.error(
                `ERROR: CommentAPI.update(${JSON.stringify(comment)}});`
            );

            return null;
        }

        return comment;
    }

    public static async get(
        filters: Object | null = null
    ): Promise<CommentType[] | null> {
        let comments: CommentType[] | null = null;

        try {
            comments = await instance
                .get(`comments${Query.parseToURI(filters)}`)
                .then((res) => res.data);
        } catch (e) {
            console.log(e);
            console.error(
                `ERROR: CommentAPI.get(${JSON.stringify(filters)}});`
            );
        }

        return comments;
    }

    public static async getById(id: number): Promise<CommentType | null> {
        let comment: CommentType | null = null;

        try {
            comment = await instance
                .get(`comments${Query.parseToURI({ id })}`)
                .then((res) => res.data[0]);
        } catch (e) {
            console.log(e);
            console.error(`ERROR: CommentAPI.getById(${id}});`);
        }

        return comment;
    }

    public static async getByPostId(
        postId: number
    ): Promise<CommentType[] | null> {
        let comments: CommentType[] | null = null;

        try {
            comments = await instance
                .get(`comments${Query.parseToURI({ postId, _expand: "user" })}`)
                .then((res) => res.data);
        } catch (e) {
            console.log(e);
            console.error(`ERROR: CommentAPI.getByPostId(${postId}});`);
        }

        return comments;
    }
}

export default CommentAPI;
