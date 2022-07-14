import ReactTimeAgo from "react-time-ago";
import styles from "./style.module.css";

interface TimeAgoProps {
  date: Date;
  content: React.ReactNode | React.ReactNode[];
}

const TimeAgo: React.FC<TimeAgoProps> = ({ date, content }) => {
  return (
    <div className={styles.timeAgo}>
      <ReactTimeAgo date={date} locale="en-US" timeStyle="twitter" />.{" "}
      <span>{content}</span>
    </div>
  );
};

export default TimeAgo;
