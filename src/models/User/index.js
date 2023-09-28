import userAPI from "../../api/userAPI";

class User {
    constructor(user) {
        this.id = user?.id ?? null;
        this.firstName = user?.firstName ?? null;
        this.lastName = user?.lastName ?? null;
        this.email = user?.email ?? null;
        this.birthdate = user?.birthdate ?? null;
        this.friends = new Set(user?.friends ?? []);
        this.username = user?.username ?? null;
        this.password = user?.password ?? null;
        this.avatar = user?.avatar ?? null;
        this.lastActivity = user?.lastActivity ?? null;
    }

    get fullName() {
        return this.firstName + " " + this.lastName;
    }

    getFullNameWithUsername() {
        return `${this.firstName} ${this.lastName} (${this.username})`;
    }

    getAvatarPath() {
        if (this.avatar.startsWith("data:image/")) {
            return this.avatar;
        }

        return `/assets/avatars/${this.avatar}`;
    }

    getDbStructure() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            birthdate: this.birthdate,
            friends: [...this.friends],
            username: this.username,
            password: this.password,
            avatar: this.avatar,
            lastActivity: this.lastActivity,
        };
    }

    async addToFriend(friend) {
        this.friends.add(friend.id);
        friend.friends.add(this.id);

        await this.save();
        await friend.save();
    }

    async save() {
        return await userAPI.update(this.getDbStructure());
    }

    static async create(
        firstName,
        lastName,
        email,
        birthdate,
        username,
        password,
        avatar
    ) {
        const user = {
            id: new Date().getTime(),
            friends: [],
            firstName,
            lastName,
            email,
            birthdate,
            username,
            password,
            avatar,
        };

        await userAPI.create(user);

        return new User(user);
    }
}

export default User;
