import styles from "./createPost.module.css";
import ProfileInput from "@/globalComponents/profileInput";
import ICONS from "@/globalComponents/icons";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "store/store";
import { createPostThunk } from "@/slice/postSlices";
import file2Base64 from "@/utils/fileToBase64";
import { CustomModal } from "@/globalComponents/modal";
import CustomSelect from "@/globalComponents/select/customSelect";
import AddImageViewer from "@/globalComponents/imageViewer";
import { randomAbstract } from "@/utils/generateFakeData";

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
  const [attachment, setAttachment] = useState<string[]>([]);
  const [popup, setPopup] = useState<boolean>(false);
  const handleSubmit = () => {
    const payload = {
      content,
      attachments: attachment,
    };
    dispatch(createPostThunk(payload));
    if (!errorCreatingPost) {
      setContent("");
      setAttachment([]);
    }
    console.log({ errorCreatingPost });
  };

  const handleAttachmentChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      const file = files[0];
      const base64 = await file2Base64(file);
      setAttachment((prevState) => [...prevState, base64]);
    }
  };

  const handleCancel = () => {
    setPopup(false);
    setAttachment([]);
  };

  const handleRemoveAttachment = (idx: number) => {
    setAttachment((prevState) => {
      prevState.splice(idx, 1);
      return [...prevState];
    });
  };

  const renderItem = (isPopup: boolean) => (
    <div className={`p-3 rounded-3 ${styles.createPost}`}>
      <ProfileInput
        placeholder="What's happening?"
        profileImage={currentUser.profileImage}
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      {isPopup && (
        <div>
          {attachment.map((item, idx) => (
            <AddImageViewer
              src={item}
              alt={`image_${idx}`}
              key={idx}
              onCancel={() => handleRemoveAttachment(idx)}
            />
          ))}
        </div>
      )}
      <div className="d-flex justify-content-between align-items-center">
        {postActions.map((action) => (
          <div
            className={styles.postAction}
            key={action.key}
            style={{ display: action.isVisible ? "block" : "none" }}
            onClick={() => setPopup(true)}
          >
            <span>{action.icon}</span>
            <span>{action.title}</span>
            <input
              type="file"
              className={styles.fileUpload}
              accept="image/*"
              onChange={(e) => handleAttachmentChange(e)}
            />
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

  const title = (
    <div className={styles.title}>
      <div>Create a Post</div>

      {/* <div className={styles.titleSubText}>
        <div>Visible for</div>
        <CustomSelect
          options={[
            {
              key: "1",
              name: "test",
              value: 1,
            },
          ]}
          onChange={() => console.log("change")}
        />
      </div> */}
    </div>
  );

  return (
    <>
      {renderItem(false)}
      <CustomModal
        visible={popup}
        footer={null}
        title={title}
        onCancel={handleCancel}
      >
        {renderItem(true)}
      </CustomModal>
    </>
  );
}
