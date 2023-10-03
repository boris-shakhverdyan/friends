import { useContext, useEffect, useState } from "react";
import CreatePost from "../../components/CreatePost";
import PostComponent from "../../components/Post";
import "./style.scss";
import Post from "../../app/Models/Post";
import AppContext from "../../contexts/AppContext";

const News = () => {
    const [posts, setPosts] = useState([]);
    const {
        state: { authUser },
    } = useContext(AppContext);

    useEffect(() => {
        (async () => {
            setPosts(await Post.all());
            setPosts(
                await Post.getByUserId([authUser.id, ...authUser.friends])
            );
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
