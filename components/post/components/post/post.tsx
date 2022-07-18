import ProfileCard from "@/globalComponents/profile-card/profileCard";
import { randomAvatar } from "@/utils/generateFakeData";
import styles from "./post.module.css";
import TimeAgo from "@/globalComponents/timeAgo";
import ImageGrid from "@/globalComponents/imageGrid";
import AvatarGroup from "@/globalComponents/avatarGroup";
import HorizontalDivider from "@/globalComponents/divider";
import ProfileInput from "@/globalComponents/profileInput";
import ICONS from "@/globalComponents/icons";
import { PostStateInterface } from "@/slice/postSlices";

const {
  LikeOutline,
  CommentOutline,
  ShareAltOutline,
  GifFileOutline,
  FileImageOutline,
  SmileLine,
  SendOutline,
  HorizontalThreeDots,
} = ICONS;

const postActions: PostActionInterface[] = [
  {
    key: "like",
    title: "Like",
    icon: <LikeOutline />,
  },
  {
    key: "comments",
    title: "Comments",
    icon: <CommentOutline />,
  },
  {
    key: "share",
    title: "Share",
    icon: <ShareAltOutline />,
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
  name,
  date,
  post,
  likedUsers,
  totalShare,
  totalComments,
}: PostStateInterface) {
  return (
    <div className={`p-3 rounded-3 ${styles.post}`}>
      <div className={`d-flex justify-content-between ${styles.post_head}`}>
        <ProfileCard
          imgSrc={randomAvatar()}
          name={name}
          subName={<TimeAgo date={date} content={"public"} />}
        />
        <HorizontalThreeDots />
      </div>
      <div className={styles.image_grid}>
        <ImageGrid images={post.images} />
      </div>
      <div
        className={`d-flex justify-content-between align-items-center ${styles.avatarGroup}`}
      >
        <AvatarGroup users={likedUsers} />
        <div>
          <span>{totalComments}</span> Comments
          <span>{totalShare}</span> Shares
        </div>
      </div>
      <div>
        <HorizontalDivider />
        <div className="d-flex justify-content-between align-items-center">
          {postActions.map((action) => (
            <div className={styles.postAction} key={action.key}>
              <span>{action.icon}</span> <span>{action.title}</span>
            </div>
          ))}
        </div>
        <HorizontalDivider />
        <div className="d-flex justify-content-between align-items-center">
          <ProfileInput
            placeholder="Write a comment..."
            symbols={profileInputIcons}
            profileImage={randomAvatar()}
          />
          <div className={`${styles.commentsSend} mb-3 ms-3`}>
            <SendOutline />
          </div>
        </div>
      </div>
    </div>
  );
}
