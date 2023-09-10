import { Navigate, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Sidebar from "./components/Sidebar";
import Profile from "./pages/Profile";
import News from "./pages/News";
import Messages from "./pages/Messages";
import Friends from "./pages/friends";

function App() {
    return (
        <div className="app">
            <Menu />
            <div className="container">
                <div className="center">
                    <Sidebar />
                    <div className="content">
                        <Routes>
                            <Route path="profile" element={<Profile />} />
                            <Route path="news" element={<News />} />
                            <Route path="messenger" element={<Messages />} />
                            <Route path="friends" element={<Friends />} />
                            <Route
                                path="*"
                                element={<Navigate to={"news"} />}
                            />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
