import User from "../models/User";
import instance from "./instance";

const authAPI = {
    me: async () => {
        const user = await JSON.parse(localStorage.getItem("authUser"));

        return new User(user);
    },

    login: async (username, password) => {
        const authUser = await instance
            .get(`users?username=${username}&password=${password}`)
            .then((res) => res.data[0]);

        localStorage.setItem("authUser", JSON.stringify(authUser));
        return new User(authUser);
    },

    logout: () => {
        localStorage.removeItem("authUser");
    },
};

export default authAPI;
