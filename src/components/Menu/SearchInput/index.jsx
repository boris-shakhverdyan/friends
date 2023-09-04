import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

const SearchInput = () => {
    const inputRef = useRef(null);

    return (
        <div className="search-input" onClick={() => inputRef.current.focus()}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input ref={inputRef} type="text" placeholder="Search" />
        </div>
    );
};

export default SearchInput;
