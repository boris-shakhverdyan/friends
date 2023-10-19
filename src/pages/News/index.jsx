import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../../components/CreatePost";
import PostComponent from "../../components/Post";
import Post from "../../app/Models/Post";
import { selectAuthUser } from "../../store/Slices/auth/selectors";
import "./style.scss";

const News = () => {
    const [posts, setPosts] = useState([]);
    const authUser = useSelector(selectAuthUser);

    useEffect(() => {
        (async () => {
            setPosts(await Post.all());
            setPosts(await Post.getByUserId([authUser.id, ...authUser.friends]));
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
