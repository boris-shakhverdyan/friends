import { useEffect, useState } from "react";
import userAPI from "../../api/userAPI";
import Friend from "../../components/Friend";
import "./style.scss";

const Friends = ({ authUser }) => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        (async () => {
            const friends = await userAPI.getByIds([...authUser.friends]);

            setFriends(friends);
        })();
    }, []);

    return (
        <div className="friends">
            <div className="friends__header">
                <div className="row flex">
                    <button className="active">
                        All friends <span>{friends.length}</span>
                    </button>
                    <button>
                        Friends online <span>{friends.length}</span>
                    </button>
                </div>
                <form className="row">
                    <input
                        type="text"
                        autoComplete="off"
                        placeholder="Find friends"
                    />
                </form>
            </div>
            <div className="friends__list">
                {friends.map((friend) => (
                    <Friend
                        key={friend.id}
                        friend={friend}
                        authUser={authUser}
                        friends={friends}
                        setFriends={setFriends}
                    />
                ))}
            </div>
        </div>
    );
};

export default Friends;
