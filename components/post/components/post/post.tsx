import ProfileCard from "@/globalComponents/profile-card/profileCard";
import {
  randomAbstract,
  randomAvatar,
  randomDateBetween,
  randomName,
} from "@/utils/generateFakeData";
import { useEffect, useState } from "react";
import styles from "./post.module.css";
import TimeAgo from "@/globalComponents/timeAgo";
import { BsThreeDots } from "react-icons/bs";
import ImageGrid from "@/globalComponents/imageGrid";
import AvatarGroup from "@/globalComponents/avatarGroup";
import HorizontalDivider from "@/globalComponents/divider";
import ProfileInput from "@/globalComponents/profileInput";
import ICONS from "@/globalComponents/icons";

const {
  LikeOutline,
  CommentOutline,
  ShareAltOutline,
  GifFileOutline,
  FileImageOutline,
  SmileLine,
  SendOutline,
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
export default function Post() {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [images, setImages] = useState<string[]>([]);
  const [likes, setLikes] = useState<likeType[]>([]);

  useEffect(() => {
    setName(randomName());
    setDate(randomDateBetween());
    [1].forEach(() => {
      setImages((prevImages) => [...prevImages, randomAbstract(500, 500)]);
    });
    const numberOfLikedUsers = Math.random() * 10;
    for (let i = 0; i <= numberOfLikedUsers; i++) {
      setLikes((prevState) => [
        ...prevState,
        {
          name: randomName(),
          profileImage: randomAvatar(),
          id: i,
        },
      ]);
    }
  }, []);

  return (
    <div className={`p-3 rounded-3 ${styles.post}`}>
      <div className={`d-flex justify-content-between ${styles.post_head}`}>
        <ProfileCard
          imgSrc={randomAvatar()}
          name={name}
          subName={<TimeAgo date={date} content={"public"} />}
        />
        <BsThreeDots />
      </div>
      <div className={styles.image_grid}>
        <ImageGrid images={images} />
      </div>
      <div
        className={`d-flex justify-content-between align-items-center ${styles.avatarGroup}`}
      >
        <AvatarGroup users={likes} />
        <div>
          <span>3</span> Comments
          <span>17</span> Shares
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
          />
          <div className={`${styles.commentsSend} mb-3 ms-3`}>
            <SendOutline />
          </div>
        </div>
      </div>
    </div>
  );
}
