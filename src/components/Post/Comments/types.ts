import Post from "../../../app/Models/Post";

export type TCommentsProps = {
    post: Post;
    isWantToComment: boolean;
    setIsWantToComment: React.Dispatch<React.SetStateAction<boolean>>;
};
