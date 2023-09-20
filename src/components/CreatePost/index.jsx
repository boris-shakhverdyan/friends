import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

const CreatePost = ({ addPost, authUser }) => {
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
                <img src={authUser.avatar} alt={authUser.avatar} />
                <h4>{`${authUser.firstName} ${authUser.lastName} (${authUser.username})`}</h4>
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
