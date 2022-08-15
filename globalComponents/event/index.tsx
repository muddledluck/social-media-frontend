import AvatarGroup from "@/globalComponents/avatarGroup";
import { Vote } from "@/types/types";
import IMAGES from "assets/images";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface EventInterface {
  content: string;
  image?: StaticImageData;
  title: string;
  seen?: Vote[];
}

const Event: React.FC<EventInterface> = ({ content, image, title, seen }) => {
  const [_content, setContent] = useState("");
  useEffect(() => {
    if (content.length > 30) {
      setContent(() => {
        const subContent = content.substring(0, 30);
        return subContent + "...";
      });
    }
  }, [content]);
  return (
    <div>
      <div className={`d-flex justify-content-between`}>
        <div className={`${styles.image} m-2`}>
          <Image src={IMAGES.openBook} alt="icon" />
        </div>
        <div className={`m-2`}>
          <h6>{title}</h6>
          <p className={`${styles.content}`}>{_content}</p>
        </div>
      </div>
      {/* <div className={`d-flex justify-content-between align-items-center`}>
        <span>{seen.length} seen</span>
        <span>
          {" "}
          <AvatarGroup votes={seen} />
        </span>
      </div> */}
    </div>
  );
};

export default Event;
