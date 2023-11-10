
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
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const MenuItem = ({ to, text, onClick }) => {
    const handleClick = (event) => {
      event.stopPropagation(); // Stop the event from propagating
      onClick(); // Close the menu first
    };
    return (
      <Link to={to} onClick={handleClick} className='text-amber-700 hover:text-sky-500 transition duration-300'>
        <li className='hover:underline'>{text}</li>
      </Link>
    );
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
            <ul className='absolute top-full right-0 bg-white border shadow-lg w-48 p-4 rounded-md transition duration-300 max-h-72 overflow-y-auto'>
              {/* Menu Items */}
              <MenuItem to='/about' text='About' onClick={closeMenu} style={{ margin: '8px 0' }}/>
              <MenuItem to='/home' text='Home' onClick={closeMenu} style={{ margin: '8px 0' }} />
              <MenuItem
                to='/profile'
                text={currentUser ? <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' /> : 'Sign in'}
                onClick={closeMenu}
                style={{ margin: '8px 0' }}
              />
                 <li style={{ margin: '8px 0' }}><hr className="dropdown-divider" /></li>
              <MenuItem to='/' text='Overview' />
                <li style={{ margin: '8px 0' }}><hr className="dropdown-divider" /></li>
                <MenuItem to='/register-cocoa' text='Receive New Batch' />
                <MenuItem to='/modify-batch' text='Modify Existing Batch' />
                <MenuItem to='/evacuation' text='Perform Evacuation With Invoice' />
                <li style={{ margin: '8px 0' }}><hr className="dropdown-divider" /></li>
                <MenuItem to='/take-stock' text='Take Stock' />
                <li style={{ margin: '8px 0' }}><hr className="dropdown-divider" /></li>
                <MenuItem to='/income' text='Income' />
                <MenuItem to='/create-expense' text='Expenditures' />
                <MenuItem to='/profit-loss' text='Profit And Loss' />
                <li style={{ margin: '8px 0' }}><hr className="dropdown-divider" /></li>
                <MenuItem to='/financial-reports' text='Financial Reports' />
                <MenuItem to='/inventory-reports' text='Inventory Reports' />
                <li style={{ margin: '8px 0' }}><hr className="dropdown-divider" /></li>
                <MenuItem to='/expense-category' text='Create An Expense Category' />
                <li style={{ margin: '8px 0' }}><hr className="dropdown-divider" /></li>
                <MenuItem to='/create-customer' text='Register A Customer' />
                <MenuItem to='/update-Customer' text='Update A Customer' />
                <li style={{ margin: '8px 0' }}><hr className="dropdown-divider" /></li>
                <MenuItem to='/add-supplier' text='Register A Supplier' />
                <MenuItem to='/find-supplier' text='Search And Update Supplier' />
                <MenuItem to='/view-suppliers' text='View All Suppliers' />
                <li style={{ margin: '8px 0' }}><hr className="dropdown-divider" /></li>
                <MenuItem to='/partners' text='Create A Partner' />
            </ul>
          )}
        </div>
        {/* Desktop Menu */}
        <ul className='hidden sm:flex gap-4'>
          {/* Menu Items */}
          <div className='relative group'>
            {/* Dropdown Icon */}
            <button
              onClick={() => handleSubMenuToggle('dropdown')}
              className='text-violet-700 hover:text-cyan-400 focus:outline-none transition duration-300'
            >
              ▼
            </button>
            {/* Dropdown Menu */}
            {activeSubMenu === 'dropdown' && (
              <ul className='absolute top-full right-0 bg-[#1c212c] border shadow-lg w-48 p-4 rounded-md transition duration-300 transform origin-top' onClick={closeMenu}>
                {/* Dropdown Menu Items */}
                <MenuItem to='/' text='Overview' />
                <li style={{ margin: '8px 0' }}><hr className="dropdown-divider" /></li>
                <MenuItem to='/register-cocoa' text='Receive New Batch' />
                <MenuItem to='/modify-batch' text='Modify Existing Batch' />
                <MenuItem to='/evacuation' text='Perform Evacuation With Invoice' />
                <MenuItem to='/take-stock' text='Take Stock' />
                <li style={{ margin: '8px 0' }}><hr className="dropdown-divider" /></li>
                <MenuItem to='/income' text='Income' />
                <MenuItem to='/create-expense' text='Expenditures' />
                <MenuItem to='/profit-loss' text='Profit And Loss' />
                <li style={{ margin: '8px 0' }}><hr className="dropdown-divider" /></li>
                <MenuItem to='/financial-reports' text='Financial Reports' />
                <MenuItem to='/inventory-reports' text='Inventory Reports' />
                <li style={{ margin: '8px 0' }}><hr className="dropdown-divider" /></li>
                <MenuItem to='/expense-category' text='Create An Expense Category' />
                <li style={{ margin: '8px 0' }}><hr className="dropdown-divider" /></li>
                <MenuItem to='/create-customer' text='Register A Customer' />
                <MenuItem to='/update-Customer' text='Update A Customer' />
                <li style={{ margin: '8px 0' }}><hr className="dropdown-divider" /></li>
                <MenuItem to='/add-supplier' text='Register A Supplier' />
                <MenuItem to='/find-supplier' text='Search And Update Supplier' />
                <MenuItem to='/view-suppliers' text='View All Suppliers' />
                <li style={{ margin: '8px 0' }}><hr className="dropdown-divider" /></li>
                <MenuItem to='/partners' text='Create A Partner' />
              </ul>
            )}
          </div>
          <MenuItem to='/about' text='About' />
          <MenuItem to='/home' text='Home' />
          <MenuItem
            to='/profile'
            text={currentUser ? <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' /> : 'Sign in'}
            onClick={closeMenu}
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