import instance from "./instance";

const postAPI = {
    async create(authUserId, body) {
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
};

export default postAPI;
