export type UserType = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    birthdate: number;
    friends: Array<number>;
    username: string;
    password: string;
    avatar: string;
    lastActivity: number;
    isOnline: boolean;
};