import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = ['/client/public/PHOTO-2023-08-27-20-21-49.jpg']; // Add paths to your images

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 30000, // 30 seconds
  };

  return (
    <div className="mx-auto my-8 max-w-4xl">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`slide ${index + 1}`} className="w-full h-64 object-cover" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
