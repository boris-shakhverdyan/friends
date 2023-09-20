import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useSendRequest } from "../../hooks/useSendRequest";
import CreatePost from "../../components/CreatePost";
import Post from "../News/Post";
import "./style.scss";

const Profile = ({ authUser, setIsLoading }) => {
    const [posts, setPosts] = useState([]);
    const { get, post } = useSendRequest();

    useEffect(() => {
        setIsLoading(true);

        (async () => {
            setPosts(await get(`posts?userId=${authUser.id}&_sort=created_at&_order=desc`));
            setIsLoading(false);
        })();
    }, [authUser]);

    const addPost = async (value) => {
        const newPost = {
            id: new Date().getTime(),
            body: value,
            userId: authUser.id,
            reactions: 0,
            created_at: new Date().getTime(),
        };

        await post("posts", newPost);

        setPosts([newPost, ...posts]);
    };

    return (
        <div className="profile">
            <div className="profileHeader">
                <div
                    className="profileCover"
                    style={{
                        backgroundImage: `url(https://sun9-79.userapi.com/impg/K-xOPE95l_QCBccyT1xSZMctCCZfdMYKVqIXXw/5ut6-S_vVnE.jpg?size=960x384&quality=95&crop=0,229,2560,1024&sign=23c34bf0f91f628a410454590c5ee182&c_uniq_tag=Ad3_mn3x1qpBxU6_2y-9v9Bj2MS7_4nLfpvsTNReBLI&type=helpers)`,
                    }}
                ></div>
                <div className="profileInfoWrapper">
                    <div
                        className="avatar-big"
                        style={{
                            backgroundImage: `url(${authUser.avatar})`,
                        }}
                    >
                        <span className="status-active"></span>
                    </div>
                    <div className="profileInfo">
                        <div className="mainInfo">
                            <h2>{`${authUser.firstName} ${authUser.lastName} (${authUser.username})`}</h2>
                            <div className="fullInfo"></div>
                        </div>
                        <div className="actions">
                            <button>Edit profile</button>
                            <button className="withIcon">
                                More <FontAwesomeIcon icon={faChevronDown} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="posts">
                <CreatePost addPost={addPost} authUser={authUser} />
                {posts.map((post) => (
                    <Post key={post.id} {...post} />
                ))}
            </div>
        </div>
    );
};

export default Profile;
