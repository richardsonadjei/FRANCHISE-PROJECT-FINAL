import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const day = now.toLocaleDateString('en-US', { weekday: 'long' });
      const date = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
      setCurrentDate(`${day}, ${date}, ${time}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/' className='flex items-center hover:scale-110 transition duration-300'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Pador</span>
            <span className='text-slate-700'>Farms Ent</span>
          </h1>
        </Link>
        <ul className='flex gap-4'>
          <Link to='/' className='hover:text-slate-700 transition duration-300'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Home
            </li>
          </Link>
          <Link to='/about' className='hover:text-slate-700 transition duration-300'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              About
            </li>
          </Link>
          <Link to='/profile' className='hover:text-slate-700 transition duration-300'>
            {currentUser ? (
              <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' />
            ) : (
              <li className='text-slate-700 hover:underline'> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
      <div className='bg-slate-300 text-slate-700 p-2 text-lg text-center font-bold hover:bg-slate-400 hover:text-white transition duration-300'>
        Today : {currentDate}
      </div>
    </header>
  );
}