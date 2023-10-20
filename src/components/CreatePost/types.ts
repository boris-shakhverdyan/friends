import Post from "../../app/Models/Post";

export type TCreatePostProps = {
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};
