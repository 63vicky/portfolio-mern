import React from 'react';
import LoadingSpinner from './loading-spinner';

const LoadingOverlay = ({ message = 'Loading...', className = '' }) => {
  return (
    <div
      className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center ${className}`}
    >
      <LoadingSpinner size="lg" />
      {message && (
        <p className="mt-4 text-lg font-medium text-foreground animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingOverlay;
