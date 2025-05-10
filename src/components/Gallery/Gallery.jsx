import React, { useState } from 'react';
import './Gallery.css';

const Gallery = ({ images, onImageClick }) => {
  const [loaded, setLoaded] = useState({});

  const handleImageLoad = (id) => {
    setLoaded((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="gallery">
      {images.map((img) => (
        <div key={img.id} className="gallery-item">
          {!loaded[img.id] && <div className="spinner"></div>}
          <img
            src={img.url}
            alt="Cat"
            onClick={() => onImageClick(img.url)}
            onLoad={() => handleImageLoad(img.id)}
            style={{ display: loaded[img.id] ? 'block' : 'none' }}
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
