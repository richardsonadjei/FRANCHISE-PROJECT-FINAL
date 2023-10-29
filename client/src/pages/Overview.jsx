import React, { useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Overview = () => {
  const carouselRef = useRef(null);

  const scrollToNextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  const scrollToPrevSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12">
      {/* Carousel */}
      <div className="h-screen w-full md:h-[50vh] md:w-full lg:w-3/4 xl:w-2/3 relative">
        <Carousel
          autoPlay
          interval={3000}
          infiniteLoop
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          dynamicHeight={false}
          className="overflow-hidden h-full w-full"
          ref={carouselRef}
        >
            <div className="h-full w-full">
                <img
                src="/PHOTO-2023-08-27-20-21-49.jpg"
                alt="Carousel Image 1"
                className="h-full w-full"
            />
            </div>
            <div className="h-full w-full">
            <img
                src="/PHOTO-2023-08-27-20-21-49 (1).jpg"
                alt="Carousel Image 2"
                className="h-full w-full"
            />
            </div>
            <div className="h-full w-full">
            <img
                src="/test.jpg"
                alt="Carousel Image 3"
                className="h-full w-full"
            />
            </div>
            <div className="h-full w-full">
            <img
                src="/try.jpg"
                alt="Carousel Image 4"
                className="h-full w-full"
            />
            </div>

        </Carousel>
        <button
          onClick={scrollToPrevSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2"
        >
          &lt;
        </button>
        <button
          onClick={scrollToNextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2"
        >
          &gt;
        </button>
      </div>
      {/* Rest of your content */}
      <div className="flex flex-col md:flex-row items-center justify-center mt-8 space-y-4 md:space-y-0 md:space-x-4">
        {/* About Card */}
        <div className="bg-white p-4 shadow rounded max-w-md">
          <h2 className="text-xl font-bold mb-2">About</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet
            nulla id justo lacinia, vitae cursus odio viverra.
          </p>
        </div>
        {/* Sign In Card */}
        <div className="bg-white p-4 shadow rounded max-w-md">
          <h2 className="text-xl font-bold mb-2">Sign In</h2>
          {/* Sign In form */}
        </div>
        {/* Sign Up Card */}
        <div className="bg-white p-4 shadow rounded max-w-md">
          <h2 className="text-xl font-bold mb-2">Sign Up</h2>
          {/* Sign Up form */}
        </div>
      </div>
      {/* Additional text */}
      <div className="mt-8 max-w-2xl">
        <p className="text-gray-700">
          Additional text content Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Nullam aliquet nulla id justo lacinia, vitae cursus odio viverra.
        </p>
      </div>
    </div>
  );
};

export default Overview;
