import styles from "../auth.module.css";

interface FormWrapperPropsInterface {
  children: React.ReactNode | React.ReactNode[];
}

const FormWrapper: React.FC<FormWrapperPropsInterface> = ({ children }) => {
  return (
    <div className="pt-1 d-flex justify-content-center">
      <div className={`${styles.auth_box} p-3`}>{children}</div>
    </div>
  );
};

export default FormWrapper;
