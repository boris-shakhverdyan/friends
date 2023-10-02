import User from ".";

class UserDBStructure {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public birthdate: number;
    public friends: Array<number>;
    public username: string;
    public password: string;
    public avatar: string;
    public lastActivity: number;
    public isOnline: boolean;

    constructor(user: User) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.birthdate = user.birthdate;
        this.friends = user.friends;
        this.username = user.username;
        this.password = user.password;
        this.avatar = user.avatar;
        this.lastActivity = user.lastActivity;
        this.isOnline = user.isOnline;
    }
}

export default UserDBStructure;
