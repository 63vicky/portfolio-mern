import { useState } from 'react';

const PlaceholderImage = ({ src, alt, className, fallbackText }) => {
  const [imageError, setImageError] = useState(false);

  const handleError = () => {
    setImageError(true);
  };

  if (imageError || !src) {
    // Display fallback with first letter or provided fallback text
    const text = fallbackText || (alt ? alt.charAt(0).toUpperCase() : '?');
    
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        aria-label={alt}
      >
        <span className="text-gray-500 text-4xl font-bold">{text}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};

export default PlaceholderImage;
