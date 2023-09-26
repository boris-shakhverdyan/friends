import instance from "./instance";

const authAPI = {
    login: async (username, password) => {
        return await instance
            .get(`users?username=${username}&password=${password}`)
            .then((res) => res.data[0]);
    },
};

export default authAPI;
