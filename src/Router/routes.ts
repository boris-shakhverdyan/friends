import Route from "../app/Services/Route";

const initRoutes = () => {
    Route.add("/").name("index");
    Route.add("/login").name("login");
    Route.add("/register").name("register");
    Route.add("/profile/:id").name("profile");
    Route.add("/messenger").name("messenger");
    Route.add("/friends").name("friends");
    Route.add("/shop").name("shop");
};

export default initRoutes;
