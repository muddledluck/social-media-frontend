import { ChangeEvent } from "react";
import styles from "./styles.module.css";

interface InputGroupPropsInterface {
  placeholder?: string;
  id?: string;
  name?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  className?: string;
  onChange: (e: ChangeEvent<any>) => any;
  symbol: React.ReactNode;
  value: string;
  type?: "password" | "text" | "email";
  afterSymbol?: React.ReactNode;
}

const InputGroup: React.FC<InputGroupPropsInterface> = ({
  placeholder,
  id,
  className,
  symbol,
  ariaDescribedBy,
  ariaLabel,
  name,
  onChange,
  value,
  type,
  afterSymbol,
}) => {
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <div className={`${styles.input_group} input-group ${className}`}>
      <span className={`${styles.input_group_icon} input-group-text`}>
        {symbol}
      </span>
      <input
        className={`${styles.input_group_input} form-control`}
        id={id}
        name={name}
        placeholder={placeholder}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        onChange={handleChange}
        value={value}
        type={type || "text"}
      />
      <span className={`${styles.input_group_after_icon } input-group-text search_input`}>
        {afterSymbol}
      </span>
    </div>
  );
};
export default InputGroup;
