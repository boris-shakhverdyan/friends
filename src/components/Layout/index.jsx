import { Outlet } from "react-router-dom";
import Menu from "../Menu";
import Sidebar from "../Sidebar";
import "./style.scss";
import { useContext } from "react";
import AppContext from "../../contexts/AppContext";

const Layout = () => {
    const {
        state: { authUser },
    } = useContext(AppContext);

    return (
        <div className="app">
            <Menu />
            {authUser ? (
                <div id="container" className="container">
                    <div className="center">
                        <Sidebar />
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
