import { Link, NavLink } from "react-router-dom";
import Notifications from "./Notifications";
import SearchInput from "./SearchInput";
import Profile from "./Profile";
import "./style.scss";
import { useContext } from "react";
import AppContext from "../../contexts/AppContext";

const Menu = () => {
    const {
        state: { authUser },
    } = useContext(AppContext);

    return (
        <div className="menu">
            <div className="container">
                <div className="left">
                    <Link to="/" className="logo">
                        <span>Friends</span>
                    </Link>
                    {authUser ? (
                        <div className="nav">
                            <SearchInput />
                            <Notifications />
                        </div>
                    ) : null}
                </div>
                <div className="right">
                    {authUser ? (
                        <Profile />
                    ) : (
                        <>
                            <NavLink to={"register"}>Register</NavLink>
                            <NavLink to={"login"}>Login</NavLink>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Menu;
