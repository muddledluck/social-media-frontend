// import LightButton from "@/globalComponents/buttons/light-button.component";
import ProfileCard from "@/globalComponents/profile-card/profileCard";
import { SuggestedUserInterface } from "@/slice/userSlices";

export default function SuggestedUser(props: SuggestedUserInterface) {
  return (
    <div>
      <ProfileCard
        imgSrc={props.profileImage}
        name={props.name}
        subName={props.designation}
      />
      <div className="d-flex justify-content-between align-items-center">
        {/* <LightButton>Ignore</LightButton> suggested user */}
        <button type="submit" className="btn btn-secondary w-100 rounded-5 me-2">
          ignore
        </button>
        <button type="submit" className="btn btn-primary w-100 rounded-5">
          Login
        </button>
      </div>
    </div>
  );
}
