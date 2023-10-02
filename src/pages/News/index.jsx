import { useEffect, useState } from "react";
import postAPI from "../../api1/postAPI";
import CreatePost from "../../components/CreatePost";
import Post from "../../components/Post";
import "./style.scss";

const News = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            setPosts(await postAPI.getAll());
        })();
    }, []);

    return (
        <div className="news">
            <CreatePost setPosts={setPosts} />
            {posts.map((post) => (
                <Post setPosts={setPosts} key={post.id} post={post} />
            ))}
        </div>
    );
};

export default News;
