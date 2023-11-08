import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [currentDate, setCurrentDate] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const day = now.toLocaleDateString('en-US', { weekday: 'long' });
      const date = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      const time = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      });
      setCurrentDate(`${day}, ${date}, ${time}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveSubMenu(null);
  };

  const handleSubMenuToggle = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
    closeMenu();
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className='bg-slate-200 shadow-md fixed top-0 w-full z-50'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        {/* Logo */}
        <Link to='/' className='flex items-center hover:scale-110 transition duration-300'>
          <h1 className='font-bold text-2xl text-slate-700'>Pador Farms Ent</h1>
        </Link>

        {/* Mobile Menu */}
        <div className='sm:hidden relative'>
          <button
            onClick={handleMenuToggle}
            className='text-slate-700 hover:text-slate-900 focus:outline-none transition duration-300'
          >
            ☰
          </button>
          {isMenuOpen && (
            <ul className='absolute top-full right-0 bg-white border shadow-lg w-48 p-4 rounded-md transition duration-300'>
              {/* Menu Items */}
              <MenuItem to='/about' text='About' onClick={closeMenu} />
              <MenuItem to='/home' text='Home' onClick={closeMenu} />
              <MenuItem
                to='/profile'
                text={currentUser ? <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' /> : 'Sign in'}
                onClick={() => closeMenu()}
              />
            </ul>
          )}
        </div>

        {/* Desktop Menu */}
        <ul className='hidden sm:flex gap-4'>
          {/* Menu Items */}
          <MenuItem to='/about' text='About' />
          <MenuItem to='/home' text='Home' />
          <MenuItem
            to='/profile'
            text={currentUser ? <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' /> : 'Sign in'}
          />
        </ul>
      </div>

      {/* Date Display */}
      <div className='bg-slate-300 text-slate-700 p-2 text-lg text-center font-bold hover:bg-slate-400 hover:text-white transition duration-300'>
        Today: {currentDate}
      </div>
    </header>
  );
}

const MenuItem = ({ to, text, onClick }) => {
  return (
    <Link to={to} onClick={onClick} className='text-slate-700 hover:text-slate-900 transition duration-300'>
      <li className='hover:underline'>{text}</li>
    </Link>
  );
};
