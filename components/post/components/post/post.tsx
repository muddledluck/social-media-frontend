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

export default function Post() {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    setName(randomName());
    setDate(randomDateBetween());
    [1].forEach(() => {
      setImages((prevImages) => [...prevImages, randomAbstract(500, 500)]);
    });
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
    </div>
  );
}
