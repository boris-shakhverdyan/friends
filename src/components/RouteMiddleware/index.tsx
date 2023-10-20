import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectAuthUser } from "../../store/Slices/auth/selectors";
import { TRouteMiddlewareProps } from "./types";
import { route } from "../../utils/helpers";

const RouteMiddleware = ({
    user = false,
    guest = false,
    redirectPath = route("login"),
}: TRouteMiddlewareProps) => {
    const authUser = useSelector(selectAuthUser);

    if ((user && !authUser) || (guest && authUser)) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default RouteMiddleware;
