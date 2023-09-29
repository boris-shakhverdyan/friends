import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import userAPI from "../../api/userAPI";
import postAPI from "../../api/postAPI";
import CreatePost from "../../components/CreatePost";
import Post from "../../components/Post";
import "./style.scss";
import User from "../../models/User";
import moment from "moment";
import ProfileNotFound from "../../components/ProfileNotFound";

const Profile = ({ authUser }) => {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            try {
                setUser(
                    authUser?.id && +id === authUser.id
                        ? authUser
                        : await userAPI.getById(id)
                );
                setPosts(await postAPI.getByUserId(+id));
            } catch (e) {
                console.log(e);
            }
        })();
    }, [id]);

    if (!user) {
        return <ProfileNotFound />;
    }

    const deleteFriend = async () => {
        userAPI.deleteFriend(authUser, user);

        setUser(new User(user));
    };

    const addToFriends = async () => {
        userAPI.addToFriend(authUser, user);

        setUser(new User({ ...user, friends: [...user.friends] }));
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
                            backgroundImage: `url(${user.getAvatarPath()})`,
                        }}
                    >
                        {user.isOnline ? (
                            <span className="status-online"></span>
                        ) : user.lastActivity ? (
                            <span className="status-offline">
                                {moment(user.lastActivity).fromNow(true)}
                            </span>
                        ) : null}
                    </div>
                    <div className="profileInfo">
                        <div className="mainInfo">
                            <h2>{`${user.firstName} ${user.lastName} (${user.username})`}</h2>
                            <div className="fullInfo"></div>
                        </div>
                        <div className="actions">
                            {user.id === authUser.id ? (
                                <button>Edit profile</button>
                            ) : user.friends.has(authUser.id) ? (
                                <button onClick={deleteFriend}>
                                    <FontAwesomeIcon icon={faUserCheck} />
                                </button>
                            ) : (
                                <button
                                    onClick={addToFriends}
                                    className="action"
                                >
                                    Add to friends
                                </button>
                            )}
                            <button className="withIcon">
                                More <FontAwesomeIcon icon={faChevronDown} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="posts">
                {user.id === authUser.id && (
                    <CreatePost setPosts={setPosts} authUser={authUser} />
                )}
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        authUser={authUser}
                        post={post}
                        setPosts={setPosts}
                    />
                ))}
            </div>
        </div>
    );
};

export default Profile;
