import instance from "./instance";

const userAPI = {
    getById: async (id) => {
        return await instance.get(`users/${id}`).then((res) => res.data);
    },

    getByIds: async (ids) => {
        const query = `users?${ids.map((id) => "id=" + id).join("&")}`;

        return await instance.get(query).then((res) => res.data);
    },

    deleteFriend: async (authUser, friend) => {
        await instance.put(`users/${friend.id}`, {
            ...friend,
            friends: friend.friends.filter((id) => id !== authUser.id),
        });

        const newFriendsIds = authUser.friends.filter((id) => id !== friend.id);

        await instance.put(`users/${authUser.id}`, {
            ...authUser,
            friends: newFriendsIds,
        });

        authUser.friends = newFriendsIds;
    },

    update: async (user) => {
        return await instance.put(`users/${user.id}`, user);
    },
};

export default userAPI;
