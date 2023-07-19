'use client';
import React, { MouseEvent } from 'react';

export const LandingMetrics = () => {
  const genres = [
    { genre: 'Documentary', count: 95075 },
    { genre: 'Drama', count: 80112 },
    { genre: 'Comedy', count: 46907 },
    { genre: 'Animation', count: 22342 },
    { genre: 'Music', count: 17923 },
    { genre: 'Horror', count: 13574 },
    { genre: 'Drama-Romance', count: 8231 },
    { genre: 'Comedy-Drama', count: 7686 },
    { genre: 'Action', count: 5999 },
    { genre: 'Thriller', count: 5545 }
  ];

  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    event.currentTarget.classList.add('border-green-500');
  };

  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    event.currentTarget.classList.remove('border-green-500');
  };

  return (
    <div className='flex flex-wrap pb-4 animate-in'>
      {genres.map((genre) => (
        <div
          key={genre.genre}
          className='rounded-lg m-2 p-4 bg-btn-background text-center border transition duration-300'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className='text-xl font-bold text-white'>{genre.genre}</div>
          <div className='text-l font-bold text-green-400'>{genre.count}</div>
        </div>
      ))}
    </div>
  );
};
