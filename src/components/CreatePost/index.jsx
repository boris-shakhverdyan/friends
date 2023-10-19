import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Post from "../../app/Models/Post";
import { selectAuthUser } from "../../store/Slices/auth/selectors";
import "./style.scss";

const CreatePost = ({ setPosts }) => {
    const authUser = useSelector(selectAuthUser);

    const addPost = async (value) => {
        const newPost = await Post.create({
            userId: authUser.id,
            body: value,
        });

        if (!newPost) {
            return;
        }

        setPosts((posts) => [newPost, ...posts]);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (e.target.content.value) {
            addPost(e.target.content.value);

            e.target.reset();
        }
    };

    return (
        <form onSubmit={onSubmit} className="createPost">
            <div className="author">
                <img src={authUser.avatar} alt={authUser.fullName} />
                <h4>{authUser.fullNameWithUsername}</h4>
            </div>
            <input autoComplete="off" name="content" placeholder="Tell us about your day․․․" />
            <div className="actions">
                <button type="submit">
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Add post</span>
                </button>
            </div>
        </form>
    );
};

export default CreatePost;
