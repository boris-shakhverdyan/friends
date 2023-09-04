import SearchInput from "./SearchInput";
import "./style.scss";
import Profile from "./Profile";
import Notifications from "./Notifications";

const Menu = () => {
    return (
        <div className="menu">
            <div className="container">
                <div className="left">
                    <a href="/" className="logo">
                        Friends
                    </a>
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
