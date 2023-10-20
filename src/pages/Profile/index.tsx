import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import CreatePost from "../../components/CreatePost";
import PostComponent from "../../components/Post";
import ProfileNotFound from "../../components/ProfileNotFound";
import User from "../../app/Models/User";
import Post from "../../app/Models/Post";
import { selectAuthUser } from "../../store/Slices/auth/selectors";
import "./style.scss";

const Profile = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const { id } = useParams();
    const authUser = useSelector(selectAuthUser);

    useEffect(() => {
        (async () => {
            try {
                if (id && authUser) {
                    if (+id === authUser.id) {
                        setUser(authUser);
                    }

                    const user = await User.find(+id);

                    if (!user) {
                        return;
                    }

                    setUser(user);
                    setPosts((await Post.getByUserId(+id)) ?? []);
                }
            } catch (e) {
                console.log(e);
            }
        })();
    }, [id]);

    if (!authUser) {
        return null;
    }

    if (!user) {
        return <ProfileNotFound />;
    }

    const deleteFriend = async () => {
        await authUser.deleteFriend(user);

        setUser((user) => {
            if (user) {
                user.friends = [...user.friends];

                return new User(user.getDBStructure());
            }

            return null;
        });
    };

    const addToFriends = async () => {
        await authUser.addToFriend(user);

        setUser((user) => {
            if (user) {
                user.friends = [...user.friends];

                return new User(user.getDBStructure());
            }

            return null;
        });
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
                            backgroundImage: `url(${user.avatar})`,
                        }}
                    >
                        {user.isOnline ? (
                            <span className="status-online"></span>
                        ) : user.lastActivity ? (
                            <span className="status-offline">{moment(user.lastActivity).fromNow(true)}</span>
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
                            ) : user.friends.includes(authUser.id) ? (
                                <button onClick={deleteFriend}>
                                    <FontAwesomeIcon icon={faUserCheck} />
                                </button>
                            ) : (
                                <button onClick={addToFriends} className="action">
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
                {user.id === authUser.id && <CreatePost setPosts={setPosts} />}
                {posts.map((post) => (
                    <PostComponent key={post.id} post={post} setPosts={setPosts} />
                ))}
            </div>
        </div>
    );
};

export default Profile;
