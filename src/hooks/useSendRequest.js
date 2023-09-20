export const HOST_LOCAL_SERVER = "http://localhost:3001/";

export const useSendRequest = () => {
    const headers = {
        "Content-Type": "application/json",
    };

    const get = async (url) => {
        return await (await fetch(HOST_LOCAL_SERVER + url)).json();
    };

    const post = async (url, data = null) => {
        return await fetch(HOST_LOCAL_SERVER + url, {
            method: "POST",
            headers,
            body: JSON.stringify(data),
        });
    };

    const put = async (url, data = null) => {
        return await fetch(HOST_LOCAL_SERVER + url, {
            method: "PUT",
            headers,
            body: JSON.stringify(data),
        });
    };

    const del = async (url) => {
        return await fetch(HOST_LOCAL_SERVER + url, { method: "DELETE" });
    };

    return { get, post, put, del };
};
