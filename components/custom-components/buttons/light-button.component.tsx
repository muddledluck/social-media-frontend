import styles from "./styles.module.css";
interface IMyProps {
  children?: React.ReactChild;
  className?: string;
}
const LightButton: React.FC = (props: IMyProps) => {
  return (
    <button
      type="submit"
      className={`${styles.light_button} ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default LightButton;
