import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import News from "./pages/News";
import Messages from "./pages/Messages";
import Friends from "./pages/Friends";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFoundPage from "./pages/NotFoundPage";
import RouteMiddleware from "./components/RouteMiddleware";
import AppContext from "./contexts/AppContext";

const AppRouter = () => {
    const { state: { authUser } } = useContext(AppContext);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route element={<RouteMiddleware isAllowed={!!authUser} />}>
                    <Route index element={<News />} />
                    <Route path="profile/:id" element={<Profile />} />
                    <Route path="messenger" element={<Messages />} />
                    <Route path="friends" element={<Friends />} />
                    <Route path="shop" element={<Shop />} />
                </Route>
                <Route element={<RouteMiddleware isAllowed={!authUser} redirectPath="/"/>}>
                    <Route path="login" element={<Login/>} />
                    <Route path="register" element={<Register />} />
                </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRouter;
