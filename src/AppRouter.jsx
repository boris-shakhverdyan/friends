import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import News from "./pages/News";
import Messages from "./pages/Messages";
import Friends from "./pages/Friends";
import Shop from "./pages/Shop";
import Login from "./pages/Login";

const AppRouter = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [authUser, setAuthUser] = useState(null);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Layout
                        isLoading={isLoading}
                        authUser={authUser}
                        setAuthUser={setAuthUser}
                    />
                }
            >
                {authUser ? (
                    <>
                        <Route
                            path="profile"
                            element={<Profile authUser={authUser} />}
                        />
                        <Route index element={<News />} />
                        <Route path="messenger" element={<Messages />} />
                        <Route path="friends" element={<Friends />} />
                        <Route path="shop" element={<Shop />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                ) : (
                    <>
                        <Route
                            path="login"
                            element={<Login setAuthUser={setAuthUser} />}
                        />
                        <Route path="*" element={<Navigate to={"login"} />} />
                    </>
                )}
            </Route>
        </Routes>
    );
};

export default AppRouter;
