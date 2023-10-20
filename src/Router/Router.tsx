import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import NotFoundPage from "../pages/NotFoundPage";
import RouteMiddleware from "../components/RouteMiddleware";
import initRoutes from "./routes";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserLayout from "../components/UserLayout";
import News from "../pages/News";
import Profile from "../pages/Profile";
import Messages from "../pages/Messages";
import Friends from "../pages/Friends";
import Shop from "../pages/Shop";
import { useEffect, useState } from "react";
import { path } from "../utils/helpers";
import Loading from "../components/Loading";

const Router = () => {
    const [status, setStatus] = useState<"loading" | "loaded">("loading");

    useEffect(() => {
        initRoutes();
        setStatus("loaded");
    }, []);

    if (status === "loading") {
        return <Loading />;
    }

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route element={<RouteMiddleware user />}>
                    <Route element={<UserLayout />}>
                        <Route index element={<News />} />
                        <Route path={path("profile")} element={<Profile />} />
                        <Route path={path("messenger")} element={<Messages />} />
                        <Route path={path("friends")} element={<Friends />} />
                        <Route path={path("shop")} element={<Shop />} />
                    </Route>
                </Route>
                <Route element={<RouteMiddleware guest redirectPath={path("index")} />}>
                    <Route path={path("login")} element={<Login />} />
                    <Route path={path("register")} element={<Register />} />
                </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default Router;
