import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import postAPI from "../../api1/postAPI";
import "./style.scss";
import { useContext } from "react";
import AppContext from "../../contexts/AppContext";

const CreatePost = ({ setPosts }) => {
    const {
        state: { authUser },
    } = useContext(AppContext);

    const addPost = async (value) => {
        const newPost = await postAPI.create(authUser.id, value);

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
                <img src={authUser.getAvatarPath()} alt={authUser.fullName} />
                <h4>{authUser.getFullNameWithUsername()}</h4>
            </div>
            <input
                autoComplete="off"
                name="content"
                placeholder="Tell us about your day․․․"
            />
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
