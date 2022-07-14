import Image from "next/image";
import { useState } from "react";
import styles from "./styles.module.css";
interface ImageGridProps {
  images: string[];
}
type ImageSizeType = {
  width: number;
  height: number;
};

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  const [imgSize, setImgSize] = useState<ImageSizeType>({
    width: 700,
    height: 500,
  });
  return (
    <div className={styles.image_grid}>
      {images[0] &&
        [images[0]].map((image) => (
          <div
            key={image}
            className={`overflow-hidden rounded ${styles.image}`}
          >
            <Image
              width={imgSize.width}
              height={imgSize.width}
              src={image}
              alt={image}
            />
          </div>
        ))}
    </div>
  );
};

export default ImageGrid;
