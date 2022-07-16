import { randomAvatar } from "@/utils/generateFakeData";
import Image from "next/image";
import styles from "./createPost.module.css";
import { VscDeviceCameraVideo } from "react-icons/vsc";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { RiUserSmileLine } from "react-icons/ri";

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
    <div className={`p-3 rounded-3 ${styles.createPost}`}>
      <div className="d-flex justify-content-center align-items-center mb-3">
        <div className={styles.profileImage}>
          <Image
            src={randomAvatar()}
            width={50}
            height={50}
            alt="profileImage"
            style={{ borderRadius: "100%" }}
          />
        </div>
        <input
          placeholder="What's happening?"
          className={`form-control ${styles.textarea}`}
        />
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
