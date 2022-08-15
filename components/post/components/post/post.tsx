import ProfileCard from "@/globalComponents/profile-card/profileCard";
import styles from "./post.module.css";
import TimeAgo from "@/globalComponents/timeAgo";
import ImageGrid from "@/globalComponents/imageGrid";
import AvatarGroup from "@/globalComponents/avatarGroup";
import HorizontalDivider from "@/globalComponents/divider";
import ProfileInput from "@/globalComponents/profileInput";
import ICONS from "@/globalComponents/icons";
import { PostInterface } from "@/api/transform/post";
import { useDispatch, useSelector } from "store/store";
import { toggleLikePostThunk } from "@/slice/postSlices";

const {
  LikeFill,
  LikeOutline,
  CommentOutline,
  ShareAltOutline,
  GifFileOutline,
  FileImageOutline,
  SmileLine,
  SendOutline,
  HorizontalThreeDots,
} = ICONS;

const postActions = ({
  isLiked,
  onLike,
  toggleLikeLoading,
}: {
  isLiked: boolean;
  onLike: () => any;
  toggleLikeLoading: boolean;
}): PostActionInterface[] => [
  {
    key: "like",
    title: "Like",
    icon: isLiked ? <LikeFill /> : <LikeOutline />,
    isVisible: true,
    onClick: onLike,
    disabled: toggleLikeLoading,
  },
  {
    key: "comments",
    title: "Comments",
    icon: <CommentOutline />,
    isVisible: true,
  },
  {
    key: "share",
    title: "Share",
    icon: <ShareAltOutline />,
    isVisible: false,
  },
];

const profileInputIcons: SymbolsType[] = [
  {
    icon: <GifFileOutline />,
    onClick: (e) => console.log("clicked"),
  },
  {
    icon: <FileImageOutline />,
    onClick: (e) => console.log("clicked"),
  },
  {
    icon: <SmileLine />,
    onClick: (e) => console.log("clicked"),
  },
];

export default function Post({
  id,
  user,
  createdAt,
  content,
  attachment,
  likedUsers,
  totalComments,
  isLiked,
}: PostInterface) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { toggleLikeLoading } = useSelector((state) => state.post);

  const handleToggleLike = () => dispatch(toggleLikePostThunk(id));
  return (
    <div className={`p-3 rounded-3 ${styles.post}`}>
      <div className={`d-flex justify-content-between ${styles.post_head}`}>
        <ProfileCard
          imgSrc={user.profileImage}
          name={user.name}
          subName={<TimeAgo date={createdAt} content={"public"} />}
        />
        <HorizontalThreeDots />
      </div>
      <div className={styles.post_content}>{content}</div>
      {attachment.length ? (
        <div className={styles.image_grid}>
          <ImageGrid images={attachment} />
        </div>
      ) : null}
      <div
        className={`d-flex justify-content-between align-items-center ${styles.avatarGroup}`}
      >
        <AvatarGroup votes={likedUsers} />
        <div>
          <span>{`${totalComments} Comments`}</span>
          {/* <span>{`${totalShare} Shares`}</span> */}
        </div>
      </div>
      <div>
        <HorizontalDivider />
        <div className="d-flex justify-content-between align-items-center">
          {postActions({
            isLiked,
            onLike: handleToggleLike,
            toggleLikeLoading,
          }).map((action) => (
            <div
              className={styles.postAction}
              key={action.key}
              style={{ display: action.isVisible ? "block" : "none" }}
              onClick={() => {
                if (!action.disabled && action.onClick) action.onClick();
              }}
            >
              <span>{action.icon}</span> <span>{action.title}</span>
            </div>
          ))}
        </div>
        <HorizontalDivider />
        <div className="d-flex justify-content-between align-items-center">
          <ProfileInput
            placeholder="Write a comment..."
            symbols={profileInputIcons}
            profileImage={currentUser.profileImage}
            onChange={(e) => console.log(e.target.value)}
            value=""
          />
          <div className={`${styles.commentsSend} mb-3 ms-3`}>
            <SendOutline />
          </div>
        </div>
      </div>
    </div>
  );
}
