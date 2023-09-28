import User from "../models/User";
import instance from "./instance";

const userAPI = {
    create: async function (user) {
        return await instance.post("users", user);
    },

    getById: async function (id) {
        return new User(
            await instance.get(`users/${id}`).then((res) => res.data)
        );
    },

    getByIds: async function (ids) {
        const query = `users?${ids.map((id) => "id=" + id).join("&")}`;

        return await instance
            .get(query)
            .then((res) => res.data)
            .then((users) => users.map((user) => new User(user)));
    },

    deleteFriend: async function (authUser, friend) {
        friend.friends = new Set(
            [...friend.friends].filter((id) => id !== authUser.id)
        );

        await this.update(friend.getDbStructure());

        authUser.friends = new Set(
            [...authUser.friends].filter((id) => id !== friend.id)
        );

        await this.update(authUser.getDbStructure());
    },

    addToFriend: async function (authUser, friend) {
        authUser.addToFriend(friend);
    },

    update: async function (user) {
        return await instance.put(`users/${user.id}`, user);
    },
};

export default userAPI;
