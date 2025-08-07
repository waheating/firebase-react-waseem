import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-100  px-6 py-4 flex justify-around items-center mb-6">
      <h1 className="text-4xl font-bold text-[#000000] ">WA<span className=' text-[#FACC15] px-1 text-2xl'>Heating</span></h1>
      <a href="#" className="text-xl font-medium text-[#DC2626] hover:underline">
        Get Help
      </a>
    </nav>
  );
};

export default Navbar;
