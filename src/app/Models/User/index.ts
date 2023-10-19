import UserAPI from "../../../api/UserAPI";
import { IncompleteUserType, UserType } from "../../../types/UserType";
import Auth from "../../Services/Auth";
import UserDBStructure from "./UserDBStructure";

class User {
    private _id: number;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _birthdate: number;
    private _friends: Array<number>;
    private _username: string;
    private _password: string;
    private _avatar: string;
    private _lastActivity: number;
    private _isOnline: boolean;

    constructor(user: UserType) {
        this._id = user.id;
        this._firstName = user.firstName;
        this._lastName = user.lastName;
        this._email = user.email;
        this._birthdate = user.birthdate;
        this._friends = user.friends;
        this._username = user.username;
        this._password = user.password;
        this._avatar = user.avatar;
        this._lastActivity = user.lastActivity;
        this._isOnline = user.isOnline;
    }

    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get firstName(): string {
        return this._firstName;
    }

    public set firstName(value: string) {
        this._firstName = value;
    }

    public get lastName(): string {
        return this._lastName;
    }

    public set lastName(value: string) {
        this._lastName = value;
    }

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        this._email = value;
    }

    public get birthdate(): number {
        return this._birthdate;
    }

    public set birthdate(value: number) {
        this._birthdate = value;
    }

    public get friends(): Array<number> {
        return this._friends;
    }

    public set friends(value: Array<number>) {
        this._friends = value;
    }

    public get username(): string {
        return this._username;
    }

    public set username(value: string) {
        this._username = value;
    }

    public get password(): string {
        return this._password;
    }

    public set password(value: string) {
        this._password = value;
    }

    public get avatar(): string {
        if (this._avatar.startsWith("data:image/")) {
            return this._avatar;
        }

        return `/assets/avatars/${this._avatar}`;
    }

    public set avatar(value: string) {
        this._avatar = value;
    }

    public get lastActivity(): number {
        return this._lastActivity;
    }

    public set lastActivity(value: number) {
        this._lastActivity = value;
    }

    public get isOnline(): boolean {
        return this._isOnline;
    }

    public set isOnline(value: boolean) {
        this._isOnline = value;
    }

    public get fullName(): string {
        return this.firstName + " " + this.lastName;
    }

    public get fullNameWithUsername(): string {
        return `${this.firstName} ${this.lastName} (${this.username})`;
    }

    public async updateOnlineStatus(isOnline = true): Promise<User> {
        this.lastActivity = new Date().getTime();
        this.isOnline = isOnline;
        this.save();

        return this;
    }

    public async save(): Promise<User> {
        let result = this.getDBStructure();

        await UserAPI.update(result);

        return this;
    }

    public async addToFriend(friend: User): Promise<User> {
        if (!this.friends.includes(friend.id)) {
            this._friends.push(friend.id);
            await this.save();
        }

        if (!friend.friends.includes(this.id)) {
            friend.friends.push(this.id);
            await friend.save();
        }

        Auth.updateLocalStorage();

        return this;
    }

    public async deleteFriend(friend: User): Promise<User> {
        if (friend.friends.includes(this.id)) {
            friend.friends = friend.friends.filter((id) => id !== this.id);
            await friend.save();
        }

        if (this.friends.includes(friend.id)) {
            this.friends = this.friends.filter((id) => id !== friend.id);
            await this.save();
        }

        Auth.updateLocalStorage();

        return this;
    }

    public getDBStructure(): UserDBStructure {
        return new UserDBStructure({
            id: this._id,
            firstName: this._firstName,
            lastName: this._lastName,
            email: this._email,
            birthdate: this._birthdate,
            friends: this._friends,
            username: this._username,
            password: this._password,
            avatar: this._avatar,
            lastActivity: this._lastActivity,
            isOnline: this._isOnline,
        });
    }

    public async getFriends(): Promise<User[] | null> {
        const users = await UserAPI.get({ id: this.friends });

        if (!users) {
            return null;
        }

        return users.map((user) => new User(user));
    }

    public static make(user: UserType | null): User | null {
        return user ? new User(user) : null;
    }

    public static async create(
        userData: IncompleteUserType
    ): Promise<User | null> {
        return this.make(
            await UserAPI.create({
                id: new Date().getTime(),
                firstName: userData.firstName,
                lastName: userData.firstName,
                email: userData.email,
                birthdate: userData.birthdate,
                friends: [],
                username: userData.username,
                password: userData.password,
                avatar: userData.avatar,
                lastActivity: new Date().getTime(),
                isOnline: false,
            })
        );
    }

    public static async find(id: number): Promise<User | null> {
        return this.make(await UserAPI.getById(id));
    }

    public static async all(): Promise<User[] | null> {
        const users = await UserAPI.get();

        if (!users) {
            return null;
        }

        return users.map((user) => new User(user));
    }

    public static async search(query: string): Promise<User[] | null> {
        const users = await UserAPI.get({ q: query });

        if (!users) {
            return null;
        }

        return users.map((user) => new User(user));
    }

    public static async getByIds(ids: Array<number>): Promise<User[] | null> {
        const users = await UserAPI.getByIds(ids);

        if (!users) {
            return null;
        }

        return users.map((user) => new User(user));
    }
}

export default User;
