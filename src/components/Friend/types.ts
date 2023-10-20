import User from "../../app/Models/User";

export type TFriendProps = {
    friend: User;
    setFriends: React.Dispatch<React.SetStateAction<User[]>>;
};
