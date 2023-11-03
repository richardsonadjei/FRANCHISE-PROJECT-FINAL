import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [currentDate, setCurrentDate] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAsideOpen, setIsAsideOpen] = useState(false);
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
    setIsAsideOpen(false);
    setActiveSubMenu(null);
  };

  const handleAsideToggle = () => {
    setIsAsideOpen(!isAsideOpen);
    setActiveSubMenu(null);
  };

  const handleSubMenuToggle = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
    closeMenu();
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const closeAside = () => {
    setIsAsideOpen(false);
    setActiveSubMenu(null);
    closeMenu();
  };

  return (
    <header className='bg-slate-200 shadow-md relative'>
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
              <MenuItem to='/home' text='Home' onClick={closeMenu} />
              <MenuItem to='/about' text='About' onClick={closeMenu} />
              <MenuItem
                to='/profile'
                text={currentUser ? <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' /> : 'Sign in'}
                onClick={() => {
                  closeMenu();
                  closeAside();
                }}
              />
              <MenuItem text='Aside' onClick={handleAsideToggle} />
            </ul>
          )}
        </div>

        {/* Desktop Menu */}
        <ul className='hidden sm:flex gap-4'>
          {/* Menu Items */}
          <MenuItem to='/home' text='Home' />
          <MenuItem to='/about' text='About' />
          <MenuItem
            to='/profile'
            text={currentUser ? <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' /> : 'Sign in'}
          />
          <MenuItem text='Aside' onClick={handleAsideToggle} />
        </ul>
      </div>

      {/* Aside Menu */}
      {isAsideOpen && (
        <div className='absolute top-full right-0 bg-white border shadow-lg w-48 p-4 rounded-md transition duration-300'>
          <div className='mb-2 font-bold text-lg'>Aside Menu</div>
          <SubMenu
            title='Inventory Management'
            items={[
              { to: '/inventory/receive-batch', text: 'Receive New Batch' },
              { to: '/inventory/modify-batch', text: 'Modify Existing Batch' },
              { to: '/inventory/evacuation', text: 'Perform Evacuation with Invoice' },
              { to: '/inventory/take-stock', text: 'Take Stock' },
            ]}
            active={activeSubMenu === 0}
            onClick={() => handleSubMenuToggle(0)}
          />
          <SubMenu
            title='Financial Management'
            items={[
              { to: '/financial/income', text: 'Income' },
              { to: '/financial/procurement', text: 'Procurement' },
              { to: '/financial/batch-expenditures', text: 'Batch Expenditures' },
              { to: '/financial/evacuation-invoice', text: 'Evacuation With Invoice' },
            ]}
            active={activeSubMenu === 1}
            onClick={() => handleSubMenuToggle(1)}
          />
          <SubMenu
            title='Reports and Analytics'
            items={[
              { to: '/reports/financial', text: 'Financial Reports' },
              { to: '/reports/inventory', text: 'Inventory Reports' },
              { to: '/reports/qc', text: 'QC Reports' },
            ]}
            active={activeSubMenu === 2}
            onClick={() => handleSubMenuToggle(2)}
          />
          <SubMenu
            title='Business Settings'
            items={[
              { to: '/settings/register-customer', text: 'Register A New Customer' },
              { to: '/settings/register-supplier', text: 'Register A Supplier' },
              { to: '/settings/create-expenditure-category', text: 'Create A New Expenditure Category' },
              { to: '/settings/view-suppliers', text: 'View All Suppliers' },
              { to: '/settings/view-customers', text: 'View All Customers' },
              { to: '/settings/view-partners', text: 'View All Partners' },
            ]}
            active={activeSubMenu === 3}
            onClick={() => handleSubMenuToggle(3)}
          />
        </div>
      )}

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

const SubMenu = ({ title, items, active, onClick }) => {
  return (
    <div className='mb-4'>
      <button
        className={`text-slate-700 hover:text-slate-900 transition duration-300 ${active ? 'font-bold' : ''}`}
        onClick={onClick}
      >
        {title} {active ? ' ▲' : ' ▼'}
      </button>
      {active && (
        <ul className='ml-4'>
          {items.map((item, index) => (
            <MenuItem key={index} to={item.to} text={item.text} onClick={onClick} />
          ))}
        </ul>
      )}
    </div>
  );
};
