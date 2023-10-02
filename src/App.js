import { useEffect, useReducer } from "react";
import Loading from "./components/Loading";
import AppContext from "./contexts/AppContext";
import AppRouter from "./AppRouter";
import Auth from "./app/Services/Auth";

export const CHANGE_LOADING_STATUS = "CHANGE_LOADING_STATUS";
export const SET_AUTH_USER = "SET_AUTH_USER";

function App() {
    const appReducer = (state, action) => {
        switch (action.type) {
            case CHANGE_LOADING_STATUS:
                return {
                    ...state,
                    isLoading: action.payload,
                };
            case SET_AUTH_USER:
                return {
                    ...state,
                    authUser: action.payload,
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(appReducer, {
        authUser: null,
        isLoading: true,
    });

    useEffect(() => {
        (async () => {
            if (localStorage.getItem("authUser")) {
                const authUser = Auth.me();

                if (!authUser) {
                    return;
                }

                dispatch({ type: SET_AUTH_USER, payload: authUser });

                Auth.updateOnlineStatus(true);
            }

            dispatch({ type: CHANGE_LOADING_STATUS, paylaod: false });
        })();
    }, []);

    if (state.isLoading) {
        return <Loading />;
    }

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            <AppRouter />
        </AppContext.Provider>
    );
}

export default App;
