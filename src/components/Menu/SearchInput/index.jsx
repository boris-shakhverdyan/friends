import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import { Link } from "react-router-dom";
import User from "../../../app/Models/User";

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            if (search) {
                setUsers(await User.search(search));
            }
        })();
    }, [search]);

    const inputRef = useRef(null);

    return (
        <div className="search-input" onClick={() => inputRef.current.focus()}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
                <div className="search-results">
                    {users.map((user) => (
                        <Link
                            to={`/profile/${user.id}`}
                            className="search-user"
                            key={user.id}
                            onClick={() => setSearch("")}
                        >
                            <img
                                src={user.avatar}
                                alt={user.fullNameWithUsername}
                            />
                            {user.fullNameWithUsername}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchInput;
