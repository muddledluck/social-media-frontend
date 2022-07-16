import styles from "./createPost.module.css";
import ProfileInput from "@/globalComponents/profileInput";
import ICONS from "@/globalComponents/icons";

const { CameraVideo, InsertPhoto, SmileLine } = ICONS;
const postActions: PostActionInterface[] = [
  {
    key: "liveVideo",
    title: "Live Video",
    icon: <CameraVideo />,
  },
  {
    key: "photoVideo",
    title: "Photo/Video",
    icon: <InsertPhoto />,
  },
  {
    key: "feeling",
    title: "Feeling",
    icon: <SmileLine />,
  },
];

export default function CreatePost() {
  return (
    <div className={`p-3 rounded-3 ${styles.createPost}`}>
      <ProfileInput placeholder="What's happening?" />
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
