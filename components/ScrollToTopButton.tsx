'use client';
import React, { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      {isVisible &&
          <button
            onClick={handleScrollToTop}
            className='sticky bottom-4 right-4 text-green-400 px-4 py-2 mx-auto my-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover border-2 border-green-400 z-10'
          >
            <FiArrowUp size={20} />
          </button>
      }
    </>
  );
};

export default ScrollToTopButton;
