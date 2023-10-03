import { useEffect, useState } from "react";
import CreatePost from "../../components/CreatePost";
import PostComponent from "../../components/Post";
import "./style.scss";
import Post from "../../app/Models/Post";

const News = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            setPosts(await Post.all());
        })();
    }, []);

    return (
        <div className="news">
            <CreatePost setPosts={setPosts} />
            {posts.map((post) => (
                <PostComponent setPosts={setPosts} key={post.id} post={post} />
            ))}
        </div>
    );
};

export default News;
