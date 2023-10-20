import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import "./style.scss";

const UserLayout = () => {
    return (
        <div id="container" className="container">
            <div className="center">
                <Sidebar />
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default UserLayout;
