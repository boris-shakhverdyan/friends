import User from "../models/User";
import userAPI from "./userAPI";

const authAPI = {
    me: async function () {
        const user = await JSON.parse(localStorage.getItem("authUser"));

        return new User(user);
    },

    login: async function (username, password) {
        const authUser = await userAPI.getByUsernameAndPassword(
            username,
            password
        );

        authUser.lastActivity = new Date().getTime();
        authUser.isOnline = true;

        await authUser.save();

        this.updateLocalStorage(authUser);

        return authUser;
    },

    logout: async function (authUser) {
        authUser.lastActivity = new Date().getTime();
        authUser.isOnline = false;

        await userAPI.update(authUser.getDbStructure());

        localStorage.removeItem("authUser");
    },

    updateLocalStorage: function (authUser) {
        localStorage.setItem(
            "authUser",
            JSON.stringify(authUser.getDbStructure())
        );
    },
};

export default authAPI;
