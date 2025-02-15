import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { ProductType } from "../types";

interface ProductDetailsProps {
  product: ProductType;
}

const ProductGallery: React.FC<ProductDetailsProps> = ({ product }) => {
  const variants = product?.variants?.[0];
  const thumbImg = Array.isArray(variants?.ThumbImg) ? variants.ThumbImg[0] : variants?.ThumbImg || "";
  const galleryImg = Array.isArray(variants?.GalleryImg) ? variants.GalleryImg : [];

  if (!galleryImg.length && !thumbImg) {
    return null;
  }

  const images = [{ original: thumbImg, thumbnail: thumbImg }, ...galleryImg.map((img) => ({
    original: img,
    thumbnail: img,
    originalHeight: 1000,
    originalWidth: 600,
    thumbnailHeight: 150,
    thumbnailWidth: 100,
  }))];

  return (
    <ImageGallery
      items={images}
      showPlayButton={false}
      autoPlay={true}
      showFullscreenButton={false}
    />
  );
};

export default ProductGallery;
