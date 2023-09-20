import { useEffect, useState } from "react";
import "./style.scss";
import Post from "./Post";
import { useSendRequest } from "../../hooks/useSendRequest";

const News = () => {
    const [posts, setPosts] = useState([]);
    const { get } = useSendRequest();

    useEffect(() => {
        (async () => {
            setPosts(await get(`posts?_sort=created_at&_order=desc`));
        })();
    }, []);

    return (
        <div className="news">
            {posts.map((post) => (
                <Post key={post.id} {...post} />
            ))}
        </div>
    );
};

export default News;
