import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectAuthUser } from "../../store/Slices/auth/selectors";
import { ROUTE_LOGIN } from "../../Router/routes";
import { TRouteMiddlewareProps } from "./types";

const RouteMiddleware = ({
    user = false,
    guest = false,
    redirectPath = ROUTE_LOGIN,
}: TRouteMiddlewareProps) => {
    const authUser = useSelector(selectAuthUser);

    if ((user && !authUser) || (guest && authUser)) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default RouteMiddleware;
