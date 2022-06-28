import styles from "../auth.module.css";
interface FormHeadPropsInterface {
  title: string;
  subTitle: string;
}
const FormHead: React.FC<FormHeadPropsInterface> = ({ title, subTitle }) => {
  return (
    <div className={styles.auth_box_head}>
      <h1 className="display-6 mb-3">{title}</h1>
      <span>{subTitle}</span>
    </div>
  );
};
export default FormHead;
