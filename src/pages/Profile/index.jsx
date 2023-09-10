import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Post from "../News/Post";

const Profile = ({ authUser }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`https://dummyjson.com/users/${authUser.id}/posts`)
            .then((res) => res.json())
            .then((data) => setPosts(data.posts));
    }, [authUser]);

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
                            backgroundImage: `url(${authUser.image})`,
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
                {posts.map((post) => (
                    <Post key={post.id} {...post} />
                ))}
            </div>
        </div>
    );
};

export default Profile;
