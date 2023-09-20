import { useEffect, useState } from "react";
import { useSendRequest } from "../../hooks/useSendRequest";
import CreatePost from "../../components/CreatePost";
import Post from "../../components/Post";
import "./style.scss";

const News = ({ authUser }) => {
    const [posts, setPosts] = useState([]);
    const { get } = useSendRequest();

    useEffect(() => {
        (async () => {
            setPosts(await get(`posts?_sort=created_at&_order=desc`));
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
