import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ProductGallery = ({ product }) => {
  const variants = product?.variants?.[0];
  const thumbImg = variants?.ThumbImg || '';
  const galleryImg = variants?.GalleryImg || [];

  if (!galleryImg) {
    return null;
  }

  const images = [thumbImg, ...galleryImg].map((img) => ({
    original: img,
    thumbnail: img,
    originalHeight: 1000,
    originalWidth: 600,
    thumbnailHeight: 150,
    thumbnailWidth: 100,
  }));

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
