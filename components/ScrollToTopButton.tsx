import React from 'react';

interface ScrollToTopButtonProps {
  handleScrollToTop: () => void;
}

const ScrollToTopButton = ({ handleScrollToTop }: ScrollToTopButtonProps) => {
  return (
    <button
      onClick={handleScrollToTop}
      className='sticky bottom-4 bg-blue-500 text-green-400 px-4 py-2 mx-auto my-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover border-2 border-green-400'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 10l7-7m0 0l7 7m-7-7v18' />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
