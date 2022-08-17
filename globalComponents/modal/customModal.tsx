import React from "react";
import { Modal as AntdModal, ModalProps } from "antd";
import styles from "./customModal.module.css";
import ICONS from "@/globalComponents/icons";

interface ICustomModal extends ModalProps {
  children: React.ReactNode | React.ReactNode[];
}

const CustomModal: React.FC<ICustomModal> = ({ children, ...props }) => {
  return (
    <AntdModal
      {...props}
      className={styles.root}
      closeIcon={
        <div style={{ color: "black", fontSize: "larger" }}>
          <ICONS.CancelCross />
        </div>
      }
    >
      {children}
    </AntdModal>
  );
};

export default CustomModal;
