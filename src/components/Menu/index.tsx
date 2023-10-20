import { Link, NavLink } from "react-router-dom";
import Notifications from "./Notifications";
import SearchInput from "./SearchInput";
import Profile from "./Profile";
import "./style.scss";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../store/Slices/auth/selectors";
import { route } from "../../utils/helpers";

const Menu = () => {
    const authUser = useSelector(selectAuthUser);

    return (
        <div id="menu">
            <div className="center">
                <div className="left">
                    <Link to={route("index")} className="logo">
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
                            <NavLink to={route("register")}>Register</NavLink>
                            <NavLink to={route("login")}>Login</NavLink>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Menu;
