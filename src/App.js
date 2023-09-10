import { Navigate, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Sidebar from "./components/Sidebar";
import Profile from "./pages/Profile";
import News from "./pages/News";
import Messages from "./pages/Messages";
import Friends from "./pages/Friends";
import Shop from "./pages/Shop";
import { useState } from "react";
import Login from "./pages/Login";

function App() {
    const [authUser, setAuthUser] = useState(null);

    return (
        <div className="app">
            <Menu authUser={authUser} setAuthUser={setAuthUser} />
            {authUser ? (
                <div id="container" className="container">
                    <div className="center">
                        <Sidebar />
                        <div className="content">
                            <Routes>
                                <Route
                                    path="profile"
                                    element={<Profile authUser={authUser} />}
                                />
                                <Route path="news" element={<News />} />
                                <Route
                                    path="messenger"
                                    element={<Messages />}
                                />
                                <Route path="friends" element={<Friends />} />
                                <Route path="shop" element={<Shop />} />
                                <Route
                                    path="*"
                                    element={<Navigate to={"news"} />}
                                />
                            </Routes>
                        </div>
                    </div>
                </div>
            ) : (
                <Routes>
                    <Route
                        path="login"
                        element={<Login setAuthUser={setAuthUser} />}
                    />
                    <Route path="*" element={<Navigate to={"login"} />} />
                </Routes>
            )}
        </div>
    );
}

export default App;
