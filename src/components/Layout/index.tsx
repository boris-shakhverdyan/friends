import { Outlet } from "react-router-dom";
import Menu from "../Menu";
import "./style.scss";
import { useEffect } from "react";
import Auth from "../../app/Services/Auth";
import { useDispatch } from "react-redux";
import { setAuthUserAC } from "../../store/Slices/auth/actions";
import { changeIsLoadingAC } from "../../store/Slices/app/actions";
import { useSelector } from "react-redux";
import { selectIsLoading, selectModal } from "../../store/Slices/app/selectors";
import Loading from "../Loading";
import Modal from "../Modal";

const Layout = () => {
    const isLoading = useSelector(selectIsLoading);
    const modal = useSelector(selectModal);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            if (localStorage.getItem("authUser")) {
                const authUser = Auth.me();

                if (!authUser) {
                    return;
                }

                dispatch(setAuthUserAC(authUser));

                Auth.updateOnlineStatus(true);
            }

            dispatch(changeIsLoadingAC(false));
        })();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div id="app">
            {modal && <Modal {...modal} />}
            <div id="content">
                <Menu />
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
