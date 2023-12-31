import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <ImageGalleryList>
      {images.map(image => (
        <li key={image.id} className="galleryItem">
          <ImageGalleryItem image={image} />
        </li>
      ))}
    </ImageGalleryList>
  );
};
