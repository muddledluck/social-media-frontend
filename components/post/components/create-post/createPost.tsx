import styles from "./createPost.module.css";
import ProfileInput from "@/globalComponents/profileInput";
import ICONS from "@/globalComponents/icons";
import { randomAvatar } from "@/utils/generateFakeData";
import { useState } from "react";
import { useDispatch, useSelector } from "store/store";
import { createPostThunk } from "@/slice/postSlices";

const { CameraVideo, InsertPhoto, SmileLine } = ICONS;
const postActions: PostActionInterface[] = [
  {
    key: "liveVideo",
    title: "Live Video",
    icon: <CameraVideo />,
    isVisible: false,
  },
  {
    key: "photoVideo",
    title: "Photo/Video",
    icon: <InsertPhoto />,
    isVisible: true,
  },
  {
    key: "feeling",
    title: "Feeling",
    icon: <SmileLine />,
    isVisible: false,
  },
];

export default function CreatePost() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const { creatingPost, errorCreatingPost } = useSelector(
    (state) => state.post
  );
  const [content, setContent] = useState<string>("");
  const handleSubmit = () => {
    const payload = {
      content,
      attachments: [],
    };
    console.log(payload);
    dispatch(createPostThunk(payload));
    if (!errorCreatingPost) setContent("");
    console.log({ errorCreatingPost });
  };
  return (
    <div className={`p-3 rounded-3 ${styles.createPost}`}>
      <ProfileInput
        placeholder="What's happening?"
        profileImage={currentUser.profileImage}
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <div className="d-flex justify-content-between align-items-center">
        {postActions.map((action) => (
          <div
            className={styles.postAction}
            key={action.key}
            style={{ display: action.isVisible ? "block" : "none" }}
          >
            <span>{action.icon}</span>
            <span>{action.title}</span>
          </div>
        ))}
        <button
          type="submit"
          className="btn btn-primary rounded-5"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          disabled={creatingPost}
        >
          {creatingPost ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}
