import userAPI from "../../api/userAPI";

class User {
    constructor(user) {
        this.id = user?.id ?? null;
        this.firstName = user?.firstName ?? null;
        this.lastName = user?.lastName ?? null;
        this.email = user?.email ?? null;
        this.birthdate = user?.birthdate ?? null;
        this.friends = user?.friends ?? [];
        this.username = user?.username ?? null;
        this.password = user?.password ?? null;
        this.avatar = user?.avatar ?? null;
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
