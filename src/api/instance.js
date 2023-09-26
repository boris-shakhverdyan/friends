import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3001/",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default instance;
