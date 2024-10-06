import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchImages } from '../../actions/imageAction';  // Import your action
import './ShowImage.css';

const ShowImage = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const { selectedFolderId, selectedSubFolderId } = useSelector((state) => state.component);
  const imagesPerPage = 20;

  useEffect(() => {
    if (selectedFolderId && selectedSubFolderId) {
      dispatch(fetchImages(selectedFolderId, selectedSubFolderId));
    }
  }, [dispatch, selectedFolderId, selectedSubFolderId]);

  const images = useSelector((state) => state.image.images || []);

  if (!images || images.length === 0) {
    return <div className="no-images">No images to display</div>;
  }

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleImageClick = (index) => setSelectedImageIndex(index);

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const previousImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
  };

  const closeZoom = () => setSelectedImageIndex(null);

  return (
    <div className="image-gallery">
      <div className="image-grid">
        {currentImages.map((image, index) => (
          <img
            key={index}
            src={image.filePath}
            alt={`img-${index}`}
            className="thumbnail"
            onClick={() => handleImageClick(index + (currentPage - 1) * imagesPerPage)}
          />
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: Math.ceil(images.length / imagesPerPage) }, (_, i) => (
          <button
            key={i}
            className={`pagination-btn ${i + 1 === currentPage ? 'active' : ''}`}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {selectedImageIndex !== null && (
        <div className="zoomed-image-container">
          <div className="overlay" onClick={closeZoom}></div>
          <div className="zoomed-image">
            <button className="prev-arrow" onClick={previousImage}>
              &#8249;
            </button>
            <img src={images[selectedImageIndex]} alt={`img-zoom-${selectedImageIndex}`} />
            <button className="next-arrow" onClick={nextImage}>
              &#8250;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowImage;
