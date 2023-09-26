import { Navigate, Outlet } from "react-router";

const RouteMiddleware = ({ isAllowed, redirectPath = "/login" }) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default RouteMiddleware;
