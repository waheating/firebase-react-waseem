import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BoilerReviews = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [visibleItems, setVisibleItems] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(400);





  const reviews = [
    {
      id: 1,
      type: 'installation',
      rating: 5,
      name: 'Sarah Johnson',
      date: '2023-05-15',
      title: 'Excellent boiler installation service',
      content: 'The team arrived on time and completed the installation of our new combi boiler efficiently. They were professional, clean, and explained everything clearly. Our new boiler is working perfectly and we have already noticed a difference in our energy bills.',
      short: 'Professional and efficient installation'
    },
    {
      id: 2,
      type: 'repair',
      rating: 4,
      name: 'Michael Thompson',
      date: '2023-04-22',
      title: 'Quick boiler repair',
      content: 'Our boiler stopped working suddenly and the engineer came out the same day. He diagnosed the issue quickly and had it fixed within an hour. Only reason for 4 stars is the slightly higher than expected cost, but the service was excellent.',
      short: 'Fast response to our boiler emergency'
    },
    {
      id: 3,
      type: 'installation',
      rating: 5,
      name: 'Emma Wilson',
      date: '2023-06-10',
      title: 'Highly recommend for new boiler installs',
      content: 'From the initial quote to the final installation, everything was handled professionally. The engineers took time to explain our options and recommended the perfect boiler for our home size. The installation was neat and tidy, with minimal disruption.',
      short: 'Professional from start to finish'
    },
    {
      id: 4,
      type: 'installation',
      rating: 5,
      name: 'David Brown',
      date: '2023-03-18',
      title: 'Great value for money',
      content: 'We got three quotes for our boiler replacement and this company offered the best combination of price and service. The installers were polite, knowledgeable, and left our home spotless. The new boiler is much quieter than our old one!',
      short: 'Best combination of price and service'
    },
    {
      id: 5,
      type: 'repair',
      rating: 4,
      name: 'Lisa Chen',
      date: '2023-02-05',
      title: 'Fixed our leaking boiler',
      content: 'Responded quickly to our call about a leaking boiler. The engineer identified a faulty valve and replaced it the same day. He also gave us some maintenance tips to prevent future issues. Very satisfied with the service.',
      short: 'Quick fix for our leaking boiler'
    },
    {
      id: 6,
      type: 'installation',
      rating: 5,
      name: 'Robert Garcia',
      date: '2023-01-30',
      title: 'Efficient and professional',
      content: 'The installation team worked like clockwork. They had our old boiler out and new one installed in less than a day. Everything was tested thoroughly and they showed us how to use all the features. Impressed with their attention to detail.',
      short: 'Smooth and efficient installation process'
    },
    {
      id: 7,
      type: 'installation',
      rating: 5,
      name: 'Olivia Martin',
      date: '2022-12-12',
      title: 'Worth every penny',
      content: 'We were hesitant about the cost of a new boiler, but the energy savings are already noticeable. The installers were careful with our property and even helped move some furniture to access the boiler location. Excellent customer service throughout.',
      short: 'Noticeable energy savings already'
    },
    {
      id: 8,
      type: 'repair',
      rating: 3,
      name: 'James Wilson',
      date: '2022-11-25',
      title: 'Good but not perfect',
      content: 'The repair fixed our immediate problem but the engineer seemed rushed and did not explain much. The boiler is working now but I would have appreciated more information about what went wrong and how to prevent it.',
      short: 'Fixed the problem but service was rushed'
    },
    {
      id: 9,
      type: 'installation',
      rating: 5,
      name: 'Sophia Lee',
      date: '2022-10-17',
      title: 'Fantastic experience',
      content: 'From the initial consultation to the final installation, everything was handled with professionalism. The engineer took time to answer all our questions and the new boiler is working beautifully. Our home has never been so warm!',
      short: 'Professional service from start to finish'
    },
    {
      id: 10,
      type: 'installation',
      rating: 4,
      name: 'Thomas Harris',
      date: '2022-09-08',
      title: 'Great installation with minor hiccup',
      content: 'Overall a very good experience with our new boiler installation. The only issue was a small delay in getting the right parts, but the company kept us informed throughout. The installers were excellent and very tidy.',
      short: 'Minor delay but excellent work'
    },
    {
      id: 11,
      type: 'repair',
      rating: 5,
      name: 'Grace Taylor',
      date: '2022-08-14',
      title: 'Saved us from freezing!',
      content: 'Our boiler broke down in the middle of winter and these guys came out within hours. The engineer worked late to get our heating back on. Amazing service when we needed it most. Will definitely use them again.',
      short: 'Emergency repair when we needed it most'
    },
    {
      id: 12,
      type: 'installation',
      rating: 5,
      name: 'Daniel Clark',
      date: '2022-07-22',
      title: 'Perfect boiler upgrade',
      content: 'We upgraded to a more efficient model and the difference is incredible. The installation team was punctual, professional, and clearly knew their stuff. They even gave us advice on optimal temperature settings.',
      short: 'Noticeable improvement with new boiler'
    },
    {
      id: 13,
      type: 'installation',
      rating: 5,
      name: 'Chloe Adams',
      date: '2022-06-30',
      title: 'Excellent from start to finish',
      content: 'The surveyor was thorough in assessing our needs, and the installation team executed perfectly. They cleaned up after themselves and left everything working perfectly. We have recommended them to all our neighbors.',
      short: 'Thorough assessment and perfect execution'
    },
    {
      id: 14,
      type: 'repair',
      rating: 4,
      name: 'William Scott',
      date: '2022-05-18',
      title: 'Reliable repair service',
      content: 'Fixed our intermittent heating issue that another company could not resolve. The engineer was methodical in his diagnosis and explained everything clearly. Slightly expensive but you get what you pay for.',
      short: 'Solved a problem others could not',
    },
    {
      id: 15,
      type: 'installation',
      rating: 5,
      name: 'Mia Rodriguez',
      date: '2022-04-05',
      title: 'Impressed with the whole process',
      content: 'The quote was competitive, the scheduling was flexible, and the installation was flawless. The engineers wore protective gear and maintained social distancing, which we appreciated. The new boiler is whisper quiet.',
      short: 'Competitive quote and flawless installation'
    },
    {
      id: 16,
      type: 'installation',
      rating: 5,
      name: 'Ethan Martinez',
      date: '2022-03-12',
      title: 'Best decision we made',
      content: 'After putting it off for years, we finally replaced our ancient boiler. Wish we would have done it sooner! The installation was quick and the difference in heating performance is amazing. Our bills are lower too.',
      short: 'Should have done this years ago'
    },
    {
      id: 17,
      type: 'repair',
      rating: 3,
      name: 'Ava Anderson',
      date: '2022-02-28',
      title: 'Fixed but took two visits',
      content: 'The first engineer could not fix the issue and had to order a part. They came back quickly to complete the repair, but it was inconvenient having to take two days off work. The repair itself seems solid though.',
      short: 'Took two visits but got the job done'
    },
    {
      id: 18,
      type: 'installation',
      rating: 5,
      name: 'Noah White',
      date: '2022-01-15',
      title: 'Exceptional service',
      content: 'Every aspect of the service exceeded expectations. The pre-installation survey was detailed, the installers were experts, and the aftercare has been excellent. Our home is now consistently warm with no cold spots.',
      short: 'Exceeded expectations at every stage'
    },
    {
      id: 19,
      type: 'installation',
      rating: 4,
      name: 'Isabella Thompson',
      date: '2021-12-10',
      title: 'Great work with minor scheduling issue',
      content: 'The installation itself was perfect, but there was a mix-up with the appointment time which caused some inconvenience. The company apologized and made up for it with a small discount. The boiler works beautifully.',
      short: 'Minor scheduling issue but excellent work'
    },
    {
      id: 20,
      type: 'repair',
      rating: 5,
      name: 'Lucas Hernandez',
      date: '2021-11-05',
      title: 'Quick and professional repair',
      content: 'Our heating stopped working on a cold November morning. The engineer arrived within two hours, diagnosed a faulty pump, and had it replaced quickly. He also did a full system check to ensure everything else was working properly.',
      short: 'Fast response and thorough repair'
    }
  ];
  



  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setContainerHeight(entry.contentRect.height);
        }
      });
      resizeObserver.observe(containerRef.current);
      return () => resizeObserver.disconnect();
    }
  }, [activeTab, visibleItems]);

  // Responsive items count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setVisibleItems(3);
      else if (window.innerWidth >= 768) setVisibleItems(2);
      else setVisibleItems(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredReviews = activeTab === 'all' 
    ? reviews 
    : reviews.filter(review => review.type === activeTab);

  // Auto-play logic
  useEffect(() => {
    if (!autoPlay || isAnimating) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoPlay, currentIndex, filteredReviews.length, visibleItems, isAnimating]);

  const handleNext = () => {
    if (isAnimating || filteredReviews.length === 0) return;
    setDirection(1);
    setIsAnimating(true);
    setCurrentIndex(prev => 
      prev + visibleItems >= filteredReviews.length ? 0 : prev + visibleItems
    );
  };

  const handlePrev = () => {
    if (isAnimating || filteredReviews.length === 0) return;
    setDirection(-1);
    setIsAnimating(true);
    setCurrentIndex(prev => 
      prev - visibleItems < 0 
        ? Math.max(0, filteredReviews.length - visibleItems) 
        : prev - visibleItems
    );
  };

  const goToIndex = (index) => {
    if (isAnimating || filteredReviews.length === 0) return;
    setDirection(index > currentIndex / visibleItems ? 1 : -1);
    setIsAnimating(true);
    setCurrentIndex(index * visibleItems);
  };

  const renderStars = (rating) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  const getVisibleReviews = () => {
    let endIndex = currentIndex + visibleItems;
    if (endIndex > filteredReviews.length) {
      const remaining = endIndex - filteredReviews.length;
      return [
        ...filteredReviews.slice(currentIndex),
        ...filteredReviews.slice(0, remaining)
      ];
    }
    return filteredReviews.slice(currentIndex, endIndex);
  };

  const totalSlides = Math.ceil(filteredReviews.length / visibleItems);

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Customer Reviews</h2>
      
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            onClick={() => { setActiveTab('all'); setCurrentIndex(0); setDirection(0); }}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            All Reviews
          </button>
          <button
            onClick={() => { setActiveTab('installation'); setCurrentIndex(0); setDirection(0); }}
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'installation' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            Installations
          </button>
          <button
            onClick={() => { setActiveTab('repair'); setCurrentIndex(0); setDirection(0); }}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${activeTab === 'repair' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            Repairs
          </button>
        </div>
      </div>

      <div className="relative">
        <div 
          className="overflow-hidden"
          style={{ height: `${containerHeight}px` }}
        >
          <div 
            ref={containerRef}
            className="relative h-full overflow-hidden"
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            <AnimatePresence 
              custom={direction}
              initial={false}
              onExitComplete={() => setIsAnimating(false)}
            >
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={{
                  enter: (direction) => ({ x: `${direction * 100}%`, opacity: 0 }),
                  center: { x: "0%", opacity: 1 },
                  exit: (direction) => ({ x: `${direction * -100}%`, opacity: 0 })
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "tween", ease: [0.32, 0.72, 0, 1], duration: 0.5 },
                  opacity: { duration: 0.3 }
                }}
                className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                style={{
                  maskImage: 'linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)',
                  padding: '0 1%'
                }}
              >
                {getVisibleReviews().map((review) => (
                  <div 
                    key={`${review.id}-${currentIndex}`}
                    className="bg-orange-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-[80%]"
                  >
                    <div className="p-6 h-full flex flex-col">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{review.title}</h3>
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {review.name} • {new Date(review.date).toLocaleDateString()}
                      </p>
                      <p className="text-gray-700 mb-3 flex-grow">{review.content}</p>
                      <div className="mt-auto pt-4 border-t border-gray-200">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          review.type === 'installation' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {review.type === 'installation' ? 'Installation' : 'Repair'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {filteredReviews.length > visibleItems && (
          <>
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 focus:outline-none disabled:opacity-50 transition-all"
              aria-label="Previous reviews"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 focus:outline-none disabled:opacity-50 transition-all"
              aria-label="Next reviews"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {filteredReviews.length > visibleItems && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              disabled={isAnimating}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex >= index * visibleItems && 
                currentIndex < (index + 1) * visibleItems ? 
                'bg-blue-600 scale-125' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {filteredReviews.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <p className="text-gray-500 text-lg">No reviews available for this category</p>
        </div>
      )}
    </div>
  );
};

export default BoilerReviews ;