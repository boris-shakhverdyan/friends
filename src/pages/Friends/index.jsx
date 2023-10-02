import { useContext, useEffect, useState } from "react";
import userAPI from "../../api1/userAPI";
import Friend from "../../components/Friend";
import "./style.scss";
import classNames from "classnames";
import AppContext from "../../contexts/AppContext";

const Friends = () => {
    const [section, setSection] = useState("all");
    const [search, setSearch] = useState("");
    const [friends, setFriends] = useState([]);
    const {
        state: { authUser },
    } = useContext(AppContext);

    useEffect(() => {
        (async () => {
            const friends = await userAPI.getByIds(
                Array.from(authUser.friends)
            );

            setFriends(friends);
        })();
    }, []);

    const getCountOfOnlineFriends = () => {
        return friends.filter((friend) => friend.isOnline).length;
    };

    return (
        <div className="friends">
            <div className="friends__header">
                <div className="row flex">
                    <button
                        className={classNames({ active: section === "all" })}
                        onClick={() => setSection("all")}
                    >
                        All friends <span>{friends.length}</span>
                    </button>
                    <button
                        className={classNames({ active: section === "online" })}
                        onClick={() => setSection("online")}
                    >
                        Friends online <span>{getCountOfOnlineFriends()}</span>
                    </button>
                </div>
                <form className="row">
                    <input
                        type="text"
                        autoComplete="off"
                        placeholder="Find friends"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
            </div>
            <div className="friends__list">
                {friends.map((friend) => {
                    if (section === "online" && !friend.isOnline) {
                        return null;
                    }

                    if (
                        search &&
                        friend
                            .getFullNameWithUsername()
                            .toLowerCase()
                            .indexOf(search.toLowerCase()) < 0
                    ) {
                        return null;
                    }

                    return (
                        <Friend
                            key={friend.id}
                            friend={friend}
                            friends={friends}
                            setFriends={setFriends}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Friends;
