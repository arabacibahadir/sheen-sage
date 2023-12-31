'use client';
import { useEffect, useState } from 'react';
import { LoadingLandingSkeleton } from '@/components/LoadingSkeleton';


interface Movie {
  title: string;
  genres: string;
  overview: string;
  production_companies: string;
  release_date: string;
  budget: number;
  revenue: number;
  runtime: number;
  tagline: string;
  credits: string;
  poster_path: string;
  backdrop_path: string;
}

export const convertMinutesToHours = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h${remainingMinutes}min`;
};

export const MovieCard = ({ movie }: { movie: Movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`bg-white shadow-lg rounded-lg p-1 w-7/8 relative overflow-hidden  mx-2 cursor-default ${
        isHovered ? 'z-10 scale-105 transform transition duration-500' : ''
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className={`h-auto w-80 rounded-lg ${isHovered ? 'filter blur-md' : ''}`}
        loading='lazy'
      />
      <div
        className={`absolute top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-80 bg-gray-900 border-4 border-green-400 rounded-lg' : 'opacity-0 '
        }`}>
        <div className='text-white text-center p-4 '>
          <p className='text-white italic text-sm'>{movie.tagline}</p>
          <h3 className='text-2xl font-bold text-green-400'>{movie.title}</h3>
          <p className='text-white italic pb-4 text-sm'>{movie.genres}</p>
          <p className='text-white text-justify text-sm'>{movie.overview}</p>
          <div className='flex justify-around italic p-2 font-bold '>
            <p className='text-green-400 text-sm'>{convertMinutesToHours(movie.runtime)}</p>
            <p className='text-green-400 text-sm'>{movie.release_date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LandingRandomMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('/api/random_best_movies');
      const data: Movie[] = await response.json();
      setMovies(data);
      setIsLoading(false);
    };
    fetchMovies();
  }, []);

  return (
    <div className='grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-4 animate-in'>
      {isLoading ? (
        Array.from({ length: 4 }).map((_, index) => <LoadingLandingSkeleton key={index} />)
      ) : (
        movies.map((movie, index) => <MovieCard key={index} movie={movie} />)
      )}
    </div>
  );
};
