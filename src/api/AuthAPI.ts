import { UserType } from "../types/UserType";
import instance from "./instance";

class AuthAPI {
    public static me(): UserType | null {
        let authUser: string | null = localStorage.getItem("authUser");

        if (!authUser) {
            return null;
        }

        return JSON.parse(authUser);
    }

    public static async login(
        username: string,
        password: string
    ): Promise<UserType | null> {
        const authUser: UserType = await instance
            .get(`users?username=${username}&password=${password}`)
            .then((res) => res.data[0]);

        if (!authUser) {
            return null;
        }

        await this.setOnlineStatus(authUser, true);

        this.updateLocalStorage(authUser);

        return authUser;
    }

    public static async setOnlineStatus(authUser: UserType, value: boolean) {
        authUser.lastActivity = new Date().getTime();
        authUser.isOnline = value;

        await instance.put(`users/${authUser.id}`, authUser);
    }

    public static updateLocalStorage(authUser: UserType): void {
        localStorage.setItem("authUser", JSON.stringify(authUser));
    }

    public static removeLocalStorage(): void {
        localStorage.removeItem("authUser");
    }
}

export default AuthAPI;
