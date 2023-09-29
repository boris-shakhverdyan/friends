import User from "../models/User";
import authAPI from "./authAPI";
import instance from "./instance";

const userAPI = {
    create: async function (user) {
        return await instance.post("users", user);
    },

    search: async function (search) {
        return await instance
            .get("users?q=" + search)
            .then((res) => res.data.map((user) => new User(user)));
    },

    getById: async function (id) {
        return new User(
            await instance.get(`users/${id}`).then((res) => res.data)
        );
    },

    getByUsernameAndPassword: async function (username, password) {
        return new User(
            await instance
                .get(`users?username=${username}&password=${password}`)
                .then((res) => res.data[0])
        );
    },

    getByIds: async function (ids) {
        if (!ids.length) {
            return [];
        }

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

        authAPI.updateLocalStorage(authUser);
    },

    addToFriend: async function (authUser, friend) {
        authUser.addToFriend(friend);

        authAPI.updateLocalStorage(authUser);
    },

    update: async function (user) {
        return await instance.put(`users/${user.id}`, user);
    },
};

export default userAPI;
