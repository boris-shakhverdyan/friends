import instance from "./instance";
import Query from "../app/Services/Query";
import { TComment, TCommentData } from "../types/CommentType";
import CommentDBStructure from "../app/Models/Comment/CommentDBStructure";

class CommentAPI {
    public static async create(comment: TCommentData): Promise<TComment | null> {
        try {
            await instance.post("comments", new CommentDBStructure(comment));
        } catch (e) {
            console.log(e);
            console.error(`ERROR: CommentAPI.create(${JSON.stringify(comment)});`);

            return null;
        }

        return (await instance.get(`comments/${"" + comment.id + Query.parseToURI({ _expand: "user" })}`))
            .data;
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

    public static async update(comment: TCommentData): Promise<TCommentData | null> {
        try {
            await instance.put(`comments/${comment.id}`, comment);
        } catch (e) {
            console.log(e);
            console.error(`ERROR: CommentAPI.update(${JSON.stringify(comment)}});`);

            return null;
        }

        return comment;
    }

    public static async get(filters: Object | null = null): Promise<TComment[] | null> {
        let comments: TComment[] | null = null;

        try {
            comments = await instance.get(`comments${Query.parseToURI(filters)}`).then((res) => res.data);
        } catch (e) {
            console.log(e);
            console.error(`ERROR: CommentAPI.get(${JSON.stringify(filters)}});`);
        }

        return comments;
    }

    public static async getById(id: number): Promise<TComment | null> {
        let comment: TComment | null = null;

        try {
            comment = await instance.get(`comments${Query.parseToURI({ id })}`).then((res) => res.data[0]);
        } catch (e) {
            console.log(e);
            console.error(`ERROR: CommentAPI.getById(${id}});`);
        }

        return comment;
    }

    public static async getByPostId(postId: number): Promise<TComment[] | null> {
        let comments: TComment[] | null = null;

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
