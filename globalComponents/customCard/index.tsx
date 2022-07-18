import styles from "./styles.module.css";
interface CustomCardInterface {
  children: React.ReactNode | React.ReactNode[];
  icon?: React.ReactNode;
  title: React.ReactNode;
}
const CustomCard: React.FC<CustomCardInterface> = ({
  children,
  icon,
  title,
}) => {
  return (
    <div className={`p-2`}>
      <div
        className={`${styles.cardTitle} d-flex justify-content-between align-items-center mb-3`}
      >
        <div>{title}</div>
        {icon && <div>{icon}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default CustomCard;
