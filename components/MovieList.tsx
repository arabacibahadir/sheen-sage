import React from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { convertMinutesToHours } from '@/components/RandomMovies';

interface Movie {
  title: string;
  genres: string;
  overview: string;
  release_date: string;
  tagline: string;
  runtime: number;
}

interface MovieListProps {
  recommendations: string[];
  posters: string[];
  details: Movie[][];
}

const truncate = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substr(0, maxLength - 3) + '...';
  }
  return text;
};

const MovieList = ({ recommendations, posters, details }: MovieListProps) => {
  const [isHovered, setIsHovered] = React.useState(-1);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const handleMouseEnter = (index: number) => {
    setIsHovered(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(-1);
  };

  const saveMovie = async (movie: Movie) => {
    const user = await supabase.auth.getUser();
    if (user.data.user === null) {
      router.push('/login');
      return;
    }
    const { data: existingMovies, error } = await supabase
      .from('movies')
      .select('*')
      .eq('user_id', user.data.user?.id)
      .eq('movie', movie.title);

    // @ts-ignore
    if (existingMovies?.length > 0) {
      return;
    }

    const { data, error: insertError } = await supabase
      .from('movies')
      .insert([{ user_id: user.data.user?.id, movie: movie.title }]);
  };

  const handleSaveMovie = (movie: Movie) => {
    saveMovie(movie);
  };

  return (
    <div className='mt-8 animate-in'>
      <div className='flex flex-wrap justify-center'>
        {recommendations.map((movie, index) => (
          <div
            key={index}
            className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 rounded-lg relative m-2 '
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={posters[index]}
              alt={`Poster ${index}`}
              className={`h-auto rounded-lg border-white border-4 ${index === isHovered ? 'filter blur-md' : ''} `}
              loading='lazy'
            />
            {details[index] && (
              <div
                className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-opacity duration-300 ${
                  index === isHovered ? 'opacity-80 bg-gray-900 border-4 border-green-400 rounded-lg' : 'opacity-0'
                }`}
              >
                <div className='text-white text-center p-4'>
                  <p className='text-white italic'>{details[index][0].tagline}</p>
                  <p className='text-2xl font-bold text-green-400'>{details[index][0].title}</p>
                  <p className='text-white italic pb-4'>{details[index][0].genres}</p>
                  <p className='text-white text-justify'>
                    {truncate(details[index][0].overview, 420)}
                  </p>
                  <div className='flex justify-around italic p-2 font-bold '>
                    <p className='text-green-400'>{convertMinutesToHours(details[index][0].runtime)}</p>
                    <p className='text-green-400'>{details[index][0].release_date}</p>
                  </div>
                  <button
                    className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 text-base focus:ring-2 focus:ring-gray-200 font-medium rounded-lg px-5 py-2 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
                    onClick={() => handleSaveMovie(details[index][0])}
                  >
                    Watch Later
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
