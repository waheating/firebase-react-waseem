import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const logoRef = useRef(null);
  const lightRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
const goToNewQuote = () => {
    navigate('/boilerQuote');
  };
  // Enhanced GSAP animation with gradient light
  useEffect(() => {
    gsap.set(lightRef.current, { x: '-100%' });

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(lightRef.current, {
      x: '100%',
      duration: 2.5,
      ease: 'power2.inOut',
    });
  }, []);

  // Color scheme variables
  const colors = {
    primary: 'bg-gradient-to-r from-gray-900 to-gray-800',
    accent: 'text-amber-400',
    accentHover: 'hover:text-amber-300',
    accentBg: 'hover:bg-amber-400/20',
    mobileBg: 'bg-gray-800/95',
    lightEffect: 'bg-gradient-to-r from-transparent via-amber-200/40 to-transparent'
  };

  const navLinks = (
    <>
      <a onClick={() => goToNewQuote()} className={`text-xl cursor-pointer block px-5 py-2 rounded-full transition ${colors.accent} ${colors.accentBg} ${colors.accentHover}`}>
        Buy A Boiler
      </a>
      <a href="#" className={`text-xl  block px-5 py-2 rounded-full transition ${colors.accent} ${colors.accentBg} ${colors.accentHover}`}>
        Buy A Cylinder
      </a>
      <a href="#" className={`text-xl  block px-5 py-2 rounded-full transition ${colors.accent} ${colors.accentBg} ${colors.accentHover}`}>
        Emergency Repair
      </a>
    </>
  );

  return (
    <nav className={`${colors.primary} backdrop-blur-md shadow-xl py-3 sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Enhanced Logo */}
          <div
            ref={logoRef}
            className="relative text-3xl md:text-4xl font-bold drop-shadow-lg overflow-hidden group"
          >
            <span className={`${colors.accent}`}>WA</span>
            <span className="text-red-400">Heating</span>

            {/* Improved light effect */}
            <span
              ref={lightRef}
              className={`absolute left-0 top-0 h-full w-1/3 ${colors.lightEffect} blur-[2px] transform rotate-12 pointer-events-none`}
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex  ">
            {navLinks}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu} 
              className={`p-2 rounded-full focus:outline-none ${colors.accentBg} transition`}
            >
              {isOpen ? 
                <FaTimes className={`text-2xl ${colors.accent}`} /> : 
                <FaBars className={`text-2xl ${colors.accent}`} />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div
          className={`md:hidden px-4 pt-2 pb-4 ${colors.mobileBg} backdrop-blur-lg shadow-inner animate-fadeIn`}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="flex flex-col space-y-3">
            {navLinks}
          </div>
        </div>
      )}
    </nav>
  );
}