'use client';
import { FormEvent, useEffect, useState } from 'react';
import Autocomplete from './AutocompleteInput';
import MovieList from './MovieList';
import { FiArrowDown, FiArrowDownCircle, FiLoader, FiSearch } from 'react-icons/fi';

interface MovieData {
  movie_details: any;
  recommendation: string[];
  movie_posters: string[];
}

export const MovieRecommendation = () => {
  const [searchInputMovie, setSearchInputMovie] = useState<string>('');
  const [movieTitle, setMovieTitle] = useState<string[]>([]);
  const [moviePosters, setMoviePosters] = useState<string[]>([]);
  const [movieDetails, setMovieDetails] = useState<any>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMovieTitle([]);
    setMoviePosters([]);
    setMovieDetails([]);
    if (searchInputMovie.trim() === '') {
      return;
    }
    setIsLoading(true);
    const response = await fetch(`/api/recommend_movie/${encodeURIComponent(searchInputMovie)}`);
    const data: MovieData = await response.json();
    setMovieTitle(data.recommendation);
    setMovieDetails(data.movie_details);
    setCurrentPage(1);
    setIsLoading(false);
  };

  const handleAutocomplete = async (value: string) => {
    setSearchInputMovie(value);

    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }

    const response = await fetch(`/api/movie_titles`);
    const data: string[] = await response.json();
    const filteredSuggestions = data.filter((title) =>
      title.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  useEffect(() => {
    const handleClickOutside: EventListener = (event: Event) => {
      const autocompleteContainer = document.getElementById('autocomplete-container');
      if (autocompleteContainer && !autocompleteContainer.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside as EventListener);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside as EventListener);
    };
  }, []);

  const handleSuggestionClick = async (suggestion: string) => {
    setSearchInputMovie(suggestion);
    setSuggestions([]);
  };

  const handleLoadMore = async () => {
    const response = await fetch(
      `/api/recommend_movie/${encodeURIComponent(searchInputMovie)}?page=${currentPage + 1}`
    );
    const data: MovieData = await response.json();
    setMovieTitle([...movieTitle, ...data.recommendation]);
    setMoviePosters([...moviePosters, ...data.movie_posters]);
    setMovieDetails([...movieDetails, ...data.movie_details]);
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const paginatedRecommendations = movieTitle.slice(0, currentPage * 12);

  const handleClearInput = () => {
    setSearchInputMovie('');
  };

  return (
    <div className='py-14 animate-in flex flex-col text-foreground z-10'>
      <form onSubmit={handleSubmit}>
        <div className='flex justify-center '>
          <Autocomplete
            suggestions={suggestions}
            handleAutocomplete={handleAutocomplete}
            handleSuggestionClick={handleSuggestionClick}
            handleClearInput={handleClearInput}
          />
          <button
            type='submit'
            className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 text-base focus:ring-2 focus:ring-gray-200 font-medium rounded-lg px-5 py-2 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ml-2'
          >
            {isLoading ? (
              <div className='animate-spin'>
                <FiLoader />
              </div>
            ) : (
              <FiSearch className='inline-block' />
            )}
          </button>
        </div>
      </form>
      {movieDetails.length > 0 && (
        <MovieList details={movieDetails.slice(0, currentPage * 12)} />
      )}
      {movieTitle.length > currentPage * 12 && paginatedRecommendations.length <= 105 && (
        <button
          onClick={handleLoadMore}
          className='py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover mx-auto mt-8 w-1/2 border-2 border-green-400'
        >
          Load More
          <FiArrowDown size={20} className='ml-2 inline-block animate-bounce text-green-400' />
        </button>
      )}
    </div>
  );
};
