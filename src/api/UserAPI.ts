import Query from "../app/Services/Query";
import { TUser } from "../types/UserType";
import instance from "./instance";

class UserAPI {
    public static async create(user: TUser): Promise<TUser | null> {
        try {
            await instance.post("users", user);
        } catch (e) {
            console.log(e);
            console.error(`ERROR: UserAPI.create(${JSON.stringify(user)});`);

            return null;
        }

        return user;
    }

    public static async delete(userId: number): Promise<boolean> {
        try {
            await instance.delete(`users/${userId}`);
        } catch (e) {
            console.log(e);
            console.error(`ERROR: UserAPI.delete(${userId}});`);

            return false;
        }

        return true;
    }

    public static async update(user: TUser): Promise<TUser | null> {
        try {
            await instance.put(`users/${user.id}`, user);
        } catch (e) {
            console.log(e);
            console.error(`ERROR: UserAPI.update(${JSON.stringify(user)}});`);

            return null;
        }

        return user;
    }

    public static async get(filters: Object | null = null): Promise<TUser[] | null> {
        let users: TUser[] | null = null;

        try {
            users = await instance.get(`users${Query.parseToURI(filters)}`).then((res) => res.data);
        } catch (e) {
            console.log(e);
            console.error(`ERROR: UserAPI.get(${JSON.stringify(filters)}});`);
        }

        return users;
    }

    public static async getById(id: number): Promise<TUser | null> {
        let user: TUser | null = null;

        try {
            user = await instance.get(`users${Query.parseToURI({ id })}`).then((res) => res.data[0]);
        } catch (e) {
            console.log(e);
            console.error(`ERROR: UserAPI.getById(${id}});`);
        }

        return user;
    }

    public static async getByIds(ids: Array<number>): Promise<TUser[] | null> {
        return await this.get({ id: ids });
    }
}

export default UserAPI;
