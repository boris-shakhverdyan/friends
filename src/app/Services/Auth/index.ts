import AuthAPI from "../../../api/AuthAPI";
import { IncompleteUserType } from "../../../types/UserType";
import User from "../../Models/User";

class Auth {
    private static _user: User | null;

    public static me(): User | null {
        if (!this._user) {
            this._user = User.make(AuthAPI.me());
        }

        return this._user;
    }

    public static async attempt(
        username: string,
        password: string
    ): Promise<User | null> {
        this._user = User.make(await AuthAPI.login(username, password));

        return this._user;
    }

    public static async logout(): Promise<boolean> {
        if (!this._user) {
            return false;
        }

        this._user.updateOnlineStatus(false);

        AuthAPI.removeLocalStorage();

        return true;
    }

    public static updateLocalStorage(): Auth | null {
        if (!this._user) {
            return null;
        }

        AuthAPI.updateLocalStorage(this._user.getDBStructure());

        return this;
    }

    public static async updateOnlineStatus(
        isOnline: boolean = true
    ): Promise<User | null> {
        if (!this._user) {
            return null;
        }

        return await this._user.updateOnlineStatus(isOnline);
    }

    public static async createAndLogin(userData: IncompleteUserType) {
        const user = await User.create({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            birthdate: userData.birthdate,
            username: userData.username,
            password: userData.password,
            avatar: userData.avatar,
        });

        if (!user) {
            return null;
        }

        return await this.attempt(user.username, user.password);
    }
}

export default Auth;
