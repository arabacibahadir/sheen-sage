'use client';
import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  movie: string;
}

const Watchlist = () => {
  const supabase = createClientComponentClient();
  const [userMovies, setUserMovies] = useState<Movie[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchUserMovies = async () => {
      const user = await supabase.auth.getUser();
      const { data: movies, error } = await supabase
        .from('movies')
        .select('*')
        .eq('user_id', user.data.user?.id);

      if (error) {
        console.error('error', error);
      } else {
        setUserMovies(movies || []);
      }
    };
    fetchUserMovies();
  }, [refresh]);

  const removeMovie = async (movie: string) => {
    const user = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('movies')
      .delete()
      .eq('user_id', user.data.user?.id)
      .eq('movie', movie);
    setRefresh(!refresh);
  };

  return (
    <div className='h-screen'>
      <Link href='/' className='absolute left-8 top-8'>
        <button
          className='flex items-center group text-sm text-foreground no-underline bg-btn-background hover:bg-btn-background-hover rounded-md py-2 px-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1'
          >
            <polyline points='15 18 9 12 15 6' />
          </svg>
          {' '}
          Back
        </button>
      </Link>
      <div className='max-w-xl mx-auto  p-4 pt-20 '>
        <h1 className='text-3xl font-bold mb-4 text-white'>Watchlist</h1>
        <ul className='space-y-2'>
          {userMovies.map((movie) => (
            <li key={movie.id}
                className='bg-btn-background p-2 rounded shadow text-white border-l-2 border-green-400 flex justify-between'>
              <span>{movie.movie}</span>
              <button
                className='text-red-500'
                onClick={() => removeMovie(movie.movie)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Watchlist;
