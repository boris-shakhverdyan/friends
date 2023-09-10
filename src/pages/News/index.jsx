import { useEffect, useState } from "react";
import "./style.scss";
import Post from "./Post";

const News = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("https://dummyjson.com/posts?limit=10")
            .then((res) => res.json())
            .then((data) => setPosts(data.posts));
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
