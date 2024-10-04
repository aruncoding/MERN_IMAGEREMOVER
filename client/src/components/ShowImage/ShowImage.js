import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './ShowImage.css'; // Make sure to create this CSS file for styling

const ShowImage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const imagesPerPage = 20;

  // Get the images from the Redux store
  const images = useSelector((state) => state.image.images || []);

  // Check if images array is valid and has length
  if (!images || images.length === 0) {
    return <div>No images to display</div>;
  }

  // Get current images for pagination
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Zoom the selected image
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  // Navigate to next/previous image in zoom mode
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

  // Close the zoomed image view
  const closeZoom = () => {
    setSelectedImageIndex(null);
  };

  return (
    <div className="image-gallery">
      <div className="image-grid">
        {currentImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`img-${index}`}
            className="thumbnail"
            onClick={() => handleImageClick(index + (currentPage - 1) * imagesPerPage)}
          />
        ))}
      </div>

      {/* Pagination Controls */}
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

      {/* Zoomed Image View */}
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
