import { Outlet } from "react-router-dom";
import Loading from "../Loading";
import Menu from "../Menu";
import "./style.scss";
import Sidebar from "../Sidebar";

const Layout = ({ isLoading, authUser, setAuthUser }) => {
    return (
        <>
            {isLoading && <Loading />}
            <div className="app">
                <Menu authUser={authUser} setAuthUser={setAuthUser} />
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
        </>
    );
};

export default Layout;
