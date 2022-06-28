import styles from "../auth.module.css";

interface FormWrapperPropsInterface {
  children: React.ReactNode | React.ReactNode[];
}

const FormWrapper: React.FC<FormWrapperPropsInterface> = ({ children }) => {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center ">
      <div className={`${styles.auth_box} p-3`}>{children}</div>
    </div>
  );
};

export default FormWrapper;
