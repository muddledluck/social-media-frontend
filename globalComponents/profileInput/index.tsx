import { randomAvatar } from "@/utils/generateFakeData";
import Image from "next/image";
import styles from "./styles.module.css";

interface ProfileInputInterface {
  symbols?: SymbolsType[];
  placeholder?: string;
}
const ProfileInput: React.FC<ProfileInputInterface> = ({
  symbols,
  placeholder,
}) => {
  return (
    <div className="d-flex justify-content-center align-items-center mb-3 w-100">
      <div className={styles.profileImage}>
        <Image
          src={randomAvatar()}
          width={50}
          height={50}
          alt="profileImage"
          style={{ borderRadius: "100%" }}
        />
      </div>
      <input
        placeholder={placeholder ? placeholder : ""}
        className={`form-control ${styles.textarea}`}
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
