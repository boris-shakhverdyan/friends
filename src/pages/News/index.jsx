import { useEffect, useState } from "react";
import postAPI from "../../api/postAPI";
import CreatePost from "../../components/CreatePost";
import Post from "../../components/Post";
import "./style.scss";

const News = ({ authUser }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            setPosts(await postAPI.getAll());
        })();
    }, []);

    return (
        <div className="news">
            <CreatePost setPosts={setPosts} authUser={authUser} />
            {posts.map((post) => (
                <Post
                    setPosts={setPosts}
                    authUser={authUser}
                    key={post.id}
                    post={post}
                />
            ))}
        </div>
    );
};

export default News;
