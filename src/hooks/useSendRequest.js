export const HOST_LOCAL_SERVER = "http://localhost:3001/";

export const useSendRequest = () => {
    const headers = {
        "Content-Type": "application/json",
    };

    const get = async (url) => {
        return await (await fetch(HOST_LOCAL_SERVER + url)).json();
    };

    const post = async (url, data = null) => {
        let response = fetch(HOST_LOCAL_SERVER + url, {
            method: "POST",
            headers,
            body: JSON.stringify(data),
        });

        response = await response.json();

        return response;
    };

    return { get, post };
};
