import React from 'react';

export const LoadingLandingSkeleton = () => {
  return (
    <div className='bg-btn-background shadow-lg rounded-lg p-1 w-80 mx-2'>
      <div className='animate-pulse'>
        <div className='h-64 bg-gray-800 rounded-lg'></div>
        <div className='h-12 bg-gray-800 mt-2 rounded'></div>
        <div className='h-8 bg-gray-800 mt-2 rounded'></div>
        <div className='h-8 bg-gray-800 mt-2 rounded'></div>
        <div className='h-8 bg-gray-800 mt-2 rounded'></div>
        <div className='h-8 bg-gray-800 mt-2 rounded'></div>
      </div>
    </div>
  );
};


export const LoadingRecommendedMovieSkeleton = () => {
  return (
    <div className='bg-btn-background shadow-lg rounded-lg p-1 w-96 mx-2 mt-8 animate-pulse'>
      <div className='animate-pulse'>
        <div className='h-96 bg-gray-800 rounded-lg'></div>
        <div className='h-12 bg-gray-800 mt-4 rounded'></div>
        <div className='h-8 bg-gray-800 mt-2 rounded'></div>
        <div className='h-8 bg-gray-800 mt-2 rounded'></div>
        <div className='h-8 bg-gray-800 mt-2 rounded'></div>
        <div className='h-8 bg-gray-800 mt-2 rounded'></div>
      </div>
    </div>
  );
};