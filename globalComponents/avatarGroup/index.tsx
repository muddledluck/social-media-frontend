import { Vote } from "@/types/types";
import { generateRandomAvatar } from "@/utils/generateFakeData";
import { Avatar, Tooltip } from "antd";

interface AvatarGroupInterface {
  votes: Vote[];
}

const AvatarGroup: React.FC<AvatarGroupInterface> = ({ votes }) => {
  return (
    <Avatar.Group maxCount={4}>
      {votes.map((vote) => {
        return (
          <Avatar
            src={
              vote.user.profileImage ||
              generateRandomAvatar(vote.user.id, vote.user.name)
            }
            alt={vote.user.name}
            key={vote.id}
          />
        );
      })}
    </Avatar.Group>
  );
};
export default AvatarGroup;
