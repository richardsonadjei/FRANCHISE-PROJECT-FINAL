import React, { useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Overview = () => {
  const carouselRef = useRef(null);

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  return (
    <div>
      {/* Carousel */}
      <div className="mt-8 relative">
        <Carousel
          autoPlay
          interval={3000}
          infiniteLoop
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          dynamicHeight
          className="overflow-hidden"
          ref={carouselRef}
        >
          <div>
            <img src="/IMG_9506.jpg" alt="Carousel Image 1" className="max-w-full h-auto" />
          </div>
          <div>
            <img src="/test.jpg" alt="Carousel Image 2" className="max-w-full h-auto" />
          </div>
          <div>
            <img src="/try.jpg" alt="Carousel Image 3" className="max-w-full h-auto" />
          </div>
        </Carousel>
        {/* Next Arrow */}
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition-colors"
          onClick={handleNextClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Overview;
