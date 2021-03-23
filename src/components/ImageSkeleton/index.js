import React from 'react';
import Skeleton from 'react-loading-skeleton';
import './style.css';

const ImageSkeleton = () => {
  return (
    <div className='ImageSkeleton'>
      <Skeleton />
    </div>
  );
};

export default ImageSkeleton;
