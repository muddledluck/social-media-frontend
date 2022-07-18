import ICONS from "@/globalComponents/icons";
import ProfileCard from "@/globalComponents/profile-card/profileCard";
import ProfileInput from "@/globalComponents/profileInput";
import { randomAvatar, randomName } from "@/utils/generateFakeData";
const { SendOutline } = ICONS;
export default function Birthday() {
  return (
    <div>
      <ProfileCard
        imgSrc={randomAvatar()}
        name={randomName()}
        subName={"Birthday today"}
      />
      <div className="d-flex justify-content-between align-items-center">
        <ProfileInput placeholder="Write on his inbox" />
        <div className={`mb-3 ms-3`}>
          <SendOutline />
        </div>
      </div>
    </div>
  );
}
