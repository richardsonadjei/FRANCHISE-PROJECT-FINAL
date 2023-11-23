import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../../public/00071492.jpg'; // Replace with the actual path to your image
import { useSelector } from 'react-redux';

const Overview = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="relative h-screen">
      {/* Responsive image covering the entire page */}
      <img
        src={backgroundImage}
        alt="Background"
        className="object-cover w-full h-full"
      />

      {/* Centered content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full">
        
        
        <div className="mt-8">
          {/* Use Link to navigate to /dashboard */}
          <Link to="/home">
            <button className="btn btn-primary mx-auto"> {/* Added mx-auto for horizontal centering */}
              <span>Get Started</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full text-center text-white font-bold py-2">
        <p>&copy; {new Date().getFullYear()} Pador Farms Warehouse. All rights reserved. </p>
        <p>Built By <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>@Richardson</span>.</p>
      </footer>
    </div>
  );
};

export default Overview;
