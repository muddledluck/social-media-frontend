import { randomAvatar } from "@/utils/generateFakeData";
import { Avatar, Tooltip } from "antd";

interface AvatarGroupInterface {
  users: likeType[];
}

const AvatarGroup: React.FC<AvatarGroupInterface> = ({ users }) => {
  return (
    <Avatar.Group maxCount={4}>
      {users.map((user) => {
        return <Avatar src={user.profileImage} alt={user.name} key={user.id} />;
      })}
    </Avatar.Group>
  );
};
export default AvatarGroup;
