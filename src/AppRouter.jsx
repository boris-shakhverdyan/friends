import { useEffect, useState } from "react";
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
import User from "./models/User";
import authAPI from "./api/authAPI";

const AppRouter = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        (async () => {
            if (localStorage.getItem("authUser")) {
                setAuthUser(new User(await authAPI.me()));
            }

            setIsLoading(false);
        })()
    }, [])

    return (
        <Routes>
            <Route path="/" element={<Layout isLoading={isLoading} authUser={authUser} setAuthUser={setAuthUser} />}>
                <Route element={<RouteMiddleware isAllowed={!!authUser} />}>
                    <Route index element={<News authUser={authUser} />} />
                    <Route path="profile" element={<Profile authUser={authUser} setIsLoading={setIsLoading} />} />
                    <Route path="profile/:id" element={<Profile authUser={authUser} setIsLoading={setIsLoading} />} />
                    <Route path="messenger" element={<Messages />} />
                    <Route path="friends" element={<Friends authUser={authUser} />} />
                    <Route path="shop" element={<Shop />} />
                </Route>
                <Route element={<RouteMiddleware isAllowed={!authUser} redirectPath="/" />}>
                    <Route path="login" element={<Login setAuthUser={setAuthUser} setIsLoading={setIsLoading} />} />
                    <Route path="register" element={<Register setAuthUser={setAuthUser} setIsLoading={setIsLoading} />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
