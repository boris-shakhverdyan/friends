import User from "../app/Models/User";
import instance from "./instance";

const commentAPI = {
    getByPostId: async (postId) => {
        return await instance
            .get(`comments?postId=${postId}&_sort=created_at&_expand=user`)
            .then((res) =>
                res.data.map((comment) => {
                    comment.user = new User(comment.user);

                    return comment;
                })
            );
    },

    create: async (authUserId, postId, body) => {
        const newComment = {
            id: new Date().getTime(),
            body,
            postId: postId,
            userId: authUserId,
            created_at: new Date().getTime(),
            reactions: [],
        };

        await instance.post(`comments`, newComment);

        return newComment;
    },

    toggleLike: async (authUser, comment) => {
        let reactions = [];

        if (comment.reactions.includes(authUser.id)) {
            reactions = comment.reactions.filter((id) => id !== authUser.id);
        } else {
            reactions = [authUser.id, ...comment.reactions];
        }

        await instance.put(`comments/${comment.id}`, {
            ...comment,
            reactions,
        });

        return reactions;
    },

    delete: async (commentId) => {
        return await instance.delete(`comments/${commentId}`);
    },
};

export default commentAPI;
