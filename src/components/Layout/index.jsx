import { Outlet } from "react-router-dom";
import Menu from "../Menu";
import Sidebar from "../Sidebar";
import "./style.scss";

const Layout = ({ authUser, setAuthUser }) => {
    return (
        <div className="app">
            <Menu authUser={authUser} setAuthUser={setAuthUser} />
            {authUser ? (
                <div id="container" className="container">
                    <div className="center">
                        <Sidebar authUser={authUser} />
                        <div className="content">
                            <Outlet />
                        </div>
                    </div>
                </div>
            ) : (
                <Outlet />
            )}
        </div>
    );
};

export default Layout;
