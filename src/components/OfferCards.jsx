import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import LogoCarousel from "./LogoCarousel";
import { useNavigate } from 'react-router-dom';

export default function OfferCards() {
  const navigate = useNavigate();
  const headingRef = useRef(null);
  const rotatingRef = useRef([]);

  const goToNewQuote = () => {
    navigate('/boilerQuote');
  };

  // Color scheme variables
  const colors = {
    primary: "text-amber-500",
    secondary: "text-amber-300",
    background: "bg-gradient-to-b from-gray-950 to-gray-900",
    cardBg: "bg-gradient-to-br from-gray-800/80 via-gray-800/90 to-gray-900",
    cardBorder: "border-amber-500/30 hover:border-amber-300/50",
    textPrimary: "text-gray-100",
    textSecondary: "text-gray-300",
    highlight: "bg-amber-500/10",
  };

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: "power3.out",
      }
    );
  }, []);

  useEffect(() => {
    const texts = rotatingRef.current;
    gsap.set(texts, { autoAlpha: 0 });

    const tl = gsap.timeline({ repeat: -1 });
    texts.forEach((el) => {
      tl.to(el, { 
        autoAlpha: 1, 
        duration: 1,
        color: colors.secondary
      })
      .to(el, { 
        autoAlpha: 0, 
        duration: 1, 
        delay: 1,
        color: colors.textSecondary
      });
    });
  }, []);

  return (
    <div className={`w-full flex flex-col items-center py-4 ${colors.background}`}>
      {/* Animated Heading Section */}
      <div className="text-center" ref={headingRef}>
        <h1 className={`text-5xl ${colors.primary} font-medium pb-4`}>
          Buy a New Boiler Online
        </h1>

        {/* ROTATING TEXT SECTION */}
        <div className="relative min-h-[3.5rem] sm:min-h-[2.5rem] w-full font-semibold tracking-wide overflow-hidden">
          {[
            "We quote online, to save you money and time.",
            "Next Day Installation",
            "Over 80,000 Boilers Installed",
            "Fully Qualified Gas Safe Registered Engineers",
          ].map((text, index) => (
            <p
              key={index}
              ref={(el) => (rotatingRef.current[index] = el)}
              className={`absolute w-full text-center ${colors.textSecondary}`}
            >
              {text}
            </p>
          ))}
        </div>
      </div>

      {/* Card Section */}
      <div className="px-4 md:px-10 lg:px-8 py-6 sm:py-8 lg:py-10 w-full mx-auto rounded-3xl">
        <div className="w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            {/* First Card - White Background */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col w-full">
              {/* Image container with fixed aspect ratio */}
              <div className="flex justify-center pt-6 px-4">
                <div className="relative w-full h-48 sm:h-56 md:h-64">
                  <img
                    src="/frontpagephotos/front.png"
                    alt="Boiler offer"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Content section */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow">
                <div className="mb-1 flex flex-col justify-start">
                  <h3 className="font-bold text-gray-900 mb-1">Boiler</h3>
                  <p className="text-xl sm:text-2xl font-bold text-orange-500 mb-2">Buy A Boiler online</p>
                  <p className="text-base sm:text-lg text-gray-600 mb-4">
                  Energy-efficient boilers installed from £1,650, including 10-year manufacturer-backed warranties.
                  </p>
                </div>
                
                <button
                  onClick={() => goToNewQuote()}
                  className="mt-auto w-full sm:w-auto mx-auto bg-orange-600 hover:bg-orange-700 text-white  py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-colors duration-300 text-base sm:text-lg"
                >
                  Get a fixed boiler price
                </button>
              </div>
            </div>

            {/* Second Card - Red Background */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col w-full">
              {/* Image container with same fixed aspect ratio */}
              <div className="flex justify-center pt-6 px-4">
                <div className="relative w-full h-48 sm:h-56 md:h-64">
                  <img
                    src="/frontpagephotos/cylinder.jpg"
                    alt="Boiler offer"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Content section */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow">
                <div className="mb-1 flex flex-col justify-start">
                  <h3 className="font-bold text-gray-900 mb-1">Cylinder</h3>
                  <p className="text-xl sm:text-2xl font-bold text-orange-500 mb-2">Buy A Cylinder online</p>
                  <p className="text-base sm:text-lg text-gray-600 mb-4">
                  Energy-efficient water cylinder  installed from £1,350, including 25-year manufacturer-backed warranties.                  </p>
                </div>
                
                <button
                  
                  className="mt-auto w-full sm:w-auto mx-auto bg-orange-600 hover:bg-orange-700 text-white  py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-colors duration-300 text-base sm:text-lg"
                >
                  Get a fixed cylinder price
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <LogoCarousel/>
    </div>
  );
}