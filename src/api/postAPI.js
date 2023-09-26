import instance from "./instance";

const postAPI = {
    getAll: async () => {
        return await instance
            .get(`posts?_sort=created_at&_order=desc`)
            .then((res) => res.data);
    },

    getByUserId: async (userId) => {
        return await instance
            .get(`posts?userId=${userId}&_sort=created_at&_order=desc`)
            .then((res) => res.data);
    },

    create: async (authUserId, body) => {
        const newPost = {
            id: new Date().getTime(),
            body,
            userId: authUserId,
            reactions: [],
            created_at: new Date().getTime(),
        };

        await instance.post("posts", newPost);

        return newPost;
    },

    toggleLike: async (authUser, post) => {
        let reactions = [];

        if (post.reactions.includes(authUser.id)) {
            reactions = post.reactions.filter((id) => id !== authUser.id);
        } else {
            reactions = [authUser.id, ...post.reactions];
        }

        await instance.put(`posts/${post.id}`, { ...post, reactions });

        return reactions;
    },

    delete: async (postId) => {
        return await instance.delete(`posts/${postId}`);
    },
};

export default postAPI;
