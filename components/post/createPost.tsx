import { randomAvatar } from "@/utils/generateFakeData";
import Image from "next/image";
import styles from "./styles.module.css";
import { VscDeviceCameraVideo } from "react-icons/vsc";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { RiUserSmileLine } from "react-icons/ri";
interface PostActionInterface {
  key: string;
  title: string;
  icon: React.ReactNode | React.ReactNode[];
}
const postActions: PostActionInterface[] = [
  {
    key: "liveVideo",
    title: "Live Video",
    icon: <VscDeviceCameraVideo />,
  },
  {
    key: "photoVideo",
    title: "Photo/Video",
    icon: <MdOutlineInsertPhoto />,
  },
  {
    key: "feeling",
    title: "Feeling",
    icon: <RiUserSmileLine />,
  },
];

export default function CreatePost() {
  return (
    <div className={styles.createPost}>
      <div className="d-flex justify-content-center align-items-center">
        <div className={styles.profileImage}>
          <Image
            src={randomAvatar()}
            width={50}
            height={50}
            alt="profileImage"
          />
        </div>
        <input placeholder="What's happening?" className={styles.textarea} />
      </div>
      <div className="d-flex justify-content-between align-items-center">
        {postActions.map((action) => (
          <div className={styles.postAction} key={action.key}>
            <span>{action.icon}</span>
            <span>{action.title}</span>
          </div>
        ))}
        <button type="submit" className="btn btn-primary rounded-5">
          Post
        </button>
      </div>
    </div>
  );
}
