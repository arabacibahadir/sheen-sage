import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FiX } from 'react-icons/fi';

interface AutocompleteProps {
  suggestions: string[];
  handleAutocomplete: (value: string) => void;
  handleSuggestionClick: (suggestion: string) => void;
  handleClearInput: () => void;
}

const Autocomplete = ({
                        suggestions,
                        handleAutocomplete,
                        handleSuggestionClick,
                        handleClearInput
                      }: AutocompleteProps) => {
  const [value, setValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const encodedValue = value.includes(':') ? encodeURIComponent(value) : value;
    setValue(encodedValue);
    handleAutocomplete(encodedValue);
  };

  const handleItemClick = (suggestion: string) => {
    setValue(suggestion);
    handleSuggestionClick(suggestion);
  };

  const handleClear = () => {
    setValue('');
    handleClearInput();
  };

  return (
    <div className='animate-in flex flex-col text-foreground z-10' ref={inputRef}>
      <div className='flex'>
        <input
          type='text'
          value={value}
          onChange={handleChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder='Discover movies'
          className='p-2 rounded-l focus:outline-none text-background w-full sm:w-96 hover:border-gray-400 border-2 border-transparent focus:border-gray-400'
        />
        <button
          type='button'
          className='flex items-center justify-center rounded-r text-gray-400 hover:text-gray-700 focus:outline-none bg-white w-12 border-2 border-transparent focus:border-gray-400'
          onClick={handleClear}
        >
          <FiX className='h-5 w-5' />
        </button>
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul
          className='bg-btn-background border border-gray-300 rounded max-h-60 overflow-y-auto absolute z-10 mt-10 mr-24 w-96'
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className='p-2 cursor-pointer hover:bg-btn-background-hover text-left'
              onClick={() => handleItemClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
