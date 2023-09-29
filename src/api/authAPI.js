import User from "../models/User";
import userAPI from "./userAPI";

const authAPI = {
    me: async () => {
        const user = await JSON.parse(localStorage.getItem("authUser"));

        return new User(user);
    },

    login: async (username, password) => {
        const authUser = await userAPI.getByUsernameAndPassword(
            username,
            password
        );

        authUser.lastActivity = new Date().getTime();
        authUser.isOnline = true;

        await authUser.save();

        localStorage.setItem("authUser", JSON.stringify(authUser.getDbStructure()));

        return authUser;
    },

    logout: (authUser) => {
        authUser.lastActivity = new Date().getTime();
        authUser.isOnline = false;

        userAPI.update(authUser.getDbStructure());

        localStorage.removeItem("authUser");
    },
};

export default authAPI;
