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
import {
  AiOutlineComment,
  AiOutlineLike,
  AiOutlineShareAlt,
} from "react-icons/ai";

const postActions: PostActionInterface[] = [
  {
    key: "like",
    title: "Like",
    icon: <AiOutlineLike />,
  },
  {
    key: "comments",
    title: "Comments",
    icon: <AiOutlineComment />,
  },
  {
    key: "share",
    title: "Share",
    icon: <AiOutlineShareAlt />,
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
      </div>
    </div>
  );
}
