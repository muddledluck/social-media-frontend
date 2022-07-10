import { randomAvatar } from "@/utils/generateFakeData";
import Image from "next/image";
import styles from "./styles.module.css";
import { VscDeviceCameraVideo } from "react-icons/vsc";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { RiUserSmileLine } from "react-icons/ri";
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
        <div>
          <span>
            <VscDeviceCameraVideo />
          </span>
          Live Video
        </div>
        <div>
          <span>
            <MdOutlineInsertPhoto />
          </span>
          Photo/Video
        </div>
        <div>
          <span>
            <RiUserSmileLine />
          </span>
          Feeling
        </div>
        <button type="submit" className="btn btn-primary rounded-5">
          Post
        </button>
      </div>
    </div>
  );
}
