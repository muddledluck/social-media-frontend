import { Attachment } from "@/types/types";
import Image from "next/image";
import { useState } from "react";
import styles from "./styles.module.css";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
interface ImageGridProps {
  images: Attachment[];
}
type ImageSizeType = {
  width: number;
  height: number;
};

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  const [imgSize, setImgSize] = useState<ImageSizeType>({
    width: 500,
    height: 500,
  });

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div>
        <ImageGallery
          items={images.map((image) => ({
            original: image.path,
            thumbnail: image.path,
            originalHeight: imgSize.height,
            originalWidth: imgSize.width,
          }))}
          lazyLoad={true}
          showThumbnails={false}
          showPlayButton={false}
          showFullscreenButton={false}
          showBullets={true}
        />
        {/* {images[0] &&
          [images[0]].map((image, index) => (
            <div
              key={image.id}
              className={`overflow-hidden rounded ${styles.image}`}
            >
              <Image
                width={imgSize.width}
                height={imgSize.width}
                src={image.path}
                alt={image.type}
              />
            </div>
          ))} */}
      </div>
    </div>
  );
};

export default ImageGrid;
