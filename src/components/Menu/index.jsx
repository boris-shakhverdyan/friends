import SearchInput from "./SearchInput";
import "./style.scss";
import Profile from "./Profile";
import Notifications from "./Notifications";
import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <div className="menu">
            <div className="container">
                <div className="left">
                    <Link to="/" className="logo">
                        <span>Friends</span>
                    </Link>
                    <div className="nav">
                        <SearchInput />
                        <Notifications />
                    </div>
                </div>
                <div className="right">
                    <Profile avatar="https://vk.com/images/camera_200.png" />
                </div>
            </div>
        </div>
    );
};

export default Menu;
