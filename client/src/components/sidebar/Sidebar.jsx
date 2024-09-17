import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMenu, IoClose } from "react-icons/io5"; // Import both icons
import './sidebar.css'; // Assuming you have custom CSS here

function Sidebar({ content }) {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [isSidebarVisible, setSidebarVisible] = useState(window.innerWidth >= 600);

  // Handle window resize
  useEffect(() => {
    const handleWindowSize = () => {
      const currentWidth = window.innerWidth;
      setWindowSize(currentWidth);

      if (currentWidth >= 600) {
        setSidebarVisible(true);  // Show sidebar for large screens
      } else {
        setSidebarVisible(false); // Hide sidebar for small screens
      }
    };

    window.addEventListener('resize', handleWindowSize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleWindowSize);
    };
  }, [windowSize]);

  return (
    <div className='relative'>
      {/* Menu icon for toggling sidebar on smaller screens */}
      {windowSize < 600 && (
        <div className='p-4'>
          <IoMenu size={24} className='cursor-pointer' onClick={() => setSidebarVisible(!isSidebarVisible)} />
        </div>
      )}

      {/* Sidebar */}
      <div className={`min-w-[200px] bg-[#403d39] h-[100vh] text-white py-4 rounded-r-md transition-all duration-300 ease-in-out 
        ${isSidebarVisible ? 'block' : 'hidden'} ${windowSize < 600 ? 'absolute top-0 left-0 h-full' : 'relative'}`}>
        <div className='mb-6 px-4'>
          {/* Close icon for small screens */}
          {windowSize < 600 && (
            <IoClose size={24} className='text-white cursor-pointer' onClick={() => setSidebarVisible(false)} />
          )}
        </div>
        <div className='flex justify-center'>
          <ul className='w-full'>
            {content?.map((item) => (
              <li key={item.value}>
                <Link to={item.link} className='flex items-center pl-8 pr-8 justify-start hover:bg-[#ffffff] gap-3 hover:text-black py-2'>
                  <span>{item.icon}</span>{item.value}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
