import Image from "next/image";
import React from "react";
import ICONS from "../icons/";
import styles from "./addImageViewer.module.css";

const { CancelCross } = ICONS;

interface IAddImageViewer {
  src: string;
  alt: string;
  onCancel: () => any;
}

const AddImageViewer: React.FC<IAddImageViewer> = ({ src, alt, onCancel }) => {
  return (
    <div className={styles.popupImageViewer}>
      <div onClick={onCancel}>
        <CancelCross />
      </div>
      <Image src={src} alt={alt} height={500} width={500} />
    </div>
  );
};

export default AddImageViewer;
