import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { useSendRequest } from "../../hooks/useSendRequest";
import CreatePost from "../../components/CreatePost";
import Post from "../../components/Post";
import "./style.scss";

const Profile = ({ authUser, setIsLoading }) => {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const { get, put } = useSendRequest();
    const params = useParams();

    useEffect(() => {
        setIsLoading(true);

        if (params?.id) {
            if (+params.id === authUser.id) {
                setUser(authUser);

                (async () => {
                    setPosts(
                        await get(
                            `posts?userId=${authUser.id}&_sort=created_at&_order=desc`
                        )
                    );

                    setIsLoading(false);
                })();
            } else {
                (async () => {
                    setUser(await get(`users/${params.id}`));

                    setPosts(
                        await get(
                            `posts?userId=${params.id}&_sort=created_at&_order=desc`
                        )
                    );

                    setIsLoading(false);
                })();
            }
        } else if (
            !params?.id &&
            (!user || (user && user.id !== authUser.id))
        ) {
            setUser(authUser);

            (async () => {
                setPosts(
                    await get(
                        `posts?userId=${authUser.id}&_sort=created_at&_order=desc`
                    )
                );
                setIsLoading(false);
            })();
        }
    }, [params?.id]);

    if (!user) {
        return <h1>404 Not Found</h1>;
    }

    const deleteFriend = async () => {
        await put(`users/${user.id}`, {
            ...user,
            friends: user.friends.filter((friend) => friend !== authUser.id),
        });

        const newFriendsIds = authUser.friends.filter((id) => id !== user.id);

        await put(`users/${authUser.id}`, {
            ...authUser,
            friends: newFriendsIds,
        });

        authUser.friends = newFriendsIds;

        setUser({ ...user, friends: [newFriendsIds] });
    };

    const addToFriends = async () => {
        authUser.friends.push(user.id);

        await put(`users/${authUser.id}`, authUser);

        user.friends.push(authUser.id);

        await put(`users/${user.id}`, user);

        setUser({ ...user, friends: [...user.friends] });
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
                        <span className="status-active"></span>
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
