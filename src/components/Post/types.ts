import Post from "../../app/Models/Post";

export type TPostProps = {
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
    post: Post;
};
