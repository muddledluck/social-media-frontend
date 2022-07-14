import Image from "next/image";
import styles from "./styles.module.css";

interface ProfileCardInterface {
  imgSrc: string;
  name: string;
  subName?: React.ReactNode;
}

const ProfileCard: React.FC<ProfileCardInterface> = ({
  imgSrc,
  name,
  subName,
}) => {
  return (
    <div className="d-flex justify-content-center align-items-center mb-3">
      <div className={styles.profileImage}>
        <Image
          src={imgSrc}
          width={50}
          height={50}
          alt="profileImage"
          style={{ borderRadius: "100%" }}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.cardName}>{name}</div>
        <span>{subName}</span>
      </div>
    </div>
  );
};

export default ProfileCard;
