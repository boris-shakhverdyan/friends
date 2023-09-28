import instance from "./instance";

const authAPI = {
    me: async () => {
        return await JSON.parse(localStorage.getItem("authUser"));
    },

    login: async (username, password) => {
        const authUser = await instance
            .get(`users?username=${username}&password=${password}`)
            .then((res) => res.data[0]);

        localStorage.setItem("authUser", JSON.stringify(authUser));
        return authUser;
    },

    logout: () => {
        localStorage.removeItem("authUser");
    },
};

export default authAPI;
