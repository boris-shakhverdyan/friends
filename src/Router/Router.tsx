import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import NotFoundPage from "../pages/NotFoundPage";
import RouteMiddleware from "../components/RouteMiddleware";
import { ROUTE_INDEX, ROUTE_LOGIN, ROUTE_REGISTRATION } from "./routes";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserLayout from "../components/UserLayout";
import News from "../pages/News";
import Profile from "../pages/Profile";
import Messages from "../pages/Messages";
import Friends from "../pages/Friends";
import Shop from "../pages/Shop";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route element={<RouteMiddleware user />}>
                    <Route element={<UserLayout />}>
                        <Route index element={<News />} />
                        <Route path="profile/:id" element={<Profile />} />
                        <Route path="messenger" element={<Messages />} />
                        <Route path="friends" element={<Friends />} />
                        <Route path="shop" element={<Shop />} />
                    </Route>
                </Route>
                <Route element={<RouteMiddleware guest redirectPath={ROUTE_INDEX} />}>
                    <Route path={ROUTE_LOGIN} element={<Login />} />
                    <Route path={ROUTE_REGISTRATION} element={<Register />} />
                </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default Router;
