import { useEffect, useState } from "react";
import "./style.scss";

const Friends = () => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        fetch("https://dummyjson.com/users?limit=10")
            .then((res) => res.json())
            .then((data) => setFriends(data.users));
    }, []);

    return (
        <div className="friends">
            {friends.map(({ firstName, lastName, username, image }) => (
                <div className="friend">
                    <img src={image} alt={image} />
                    <h3>{`${firstName} ${lastName} (${username})`}</h3>
                </div>
            ))}
        </div>
    );
};

export default Friends;
