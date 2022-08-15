import Image from "next/image";
import { ChangeEvent } from "react";
import styles from "./styles.module.css";

interface ProfileInputInterface {
  symbols?: SymbolsType[];
  placeholder?: string;
  profileImage?: string;
  onChange: (e: ChangeEvent<any>) => any;
  value: string;
}
const ProfileInput: React.FC<ProfileInputInterface> = ({
  symbols,
  placeholder,
  profileImage,
  onChange,
  value,
}) => {
  return (
    <div className="d-flex justify-content-center align-items-center mb-3 w-100">
      {profileImage ? (
        <div className={styles.profileImage}>
          <Image
            src={profileImage || ""}
            width={50}
            height={50}
            alt="profileImage"
            style={{ borderRadius: "100%" }}
          />
        </div>
      ) : (
        ""
      )}
      <textarea
        placeholder={placeholder ? placeholder : ""}
        className={`form-control ${styles.textarea}`}
        onChange={onChange}
        value={value}
      />
      {symbols?.map((symbol, idx) => {
        return (
          <div
            onClick={symbol.onClick}
            key={idx}
            className={`${styles.icon} ms-2`}
          >
            {symbol.icon}
          </div>
        );
      })}
    </div>
  );
};

export default ProfileInput;
