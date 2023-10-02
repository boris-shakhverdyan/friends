import UserAPI from "../../../api/UserAPI";
import { UserType } from "../../../types/UserType";
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

    public get firstName(): string {
        return this._firstName;
    }

    public get lastName(): string {
        return this._lastName;
    }

    public get email(): string {
        return this._email;
    }

    public get birthdate(): number {
        return this._birthdate;
    }

    public get friends(): Array<number> {
        return this._friends;
    }

    public get username(): string {
        return this._username;
    }

    public get password(): string {
        return this._password;
    }

    public get avatar(): string {
        return this._avatar;
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

    public getDBStructure(): UserDBStructure {
        return new UserDBStructure(this);
    }

    public static make(user: UserType | null): User | null {
        return user ? new User(user) : null;
    }

    public static async create(user: UserType): Promise<User | null> {
        return this.make(await UserAPI.create(user));
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
}

export default User;
