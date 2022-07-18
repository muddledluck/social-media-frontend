import ReactTimeAgo from "react-time-ago";
import styles from "./style.module.css";

interface TimeAgoProps {
  date: string;
  content: React.ReactNode | React.ReactNode[];
}

const TimeAgo: React.FC<TimeAgoProps> = ({ date, content }) => {
  return (
    <div className={styles.timeAgo}>
      <ReactTimeAgo date={new Date(date)} locale="en-US" timeStyle="twitter" />.{" "}
      <span>{content}</span>
    </div>
  );
};

export default TimeAgo;
